<?php

namespace App\Controller;

use InvalidArgumentException;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Routing\Annotation\Route;

class MailerController extends AbstractController
{
    #[Route('/api/send-email', name: 'send_email', methods: ['POST'])]
    public function sendEmail(Request $request, MailerInterface $mailer): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            $type = $data['type'] ?? null;
            $fullName = $data['fullName'] ?? null;
            $role = $data['role'] ?? null;
            $link = $data['link'] ?? null;
            $recipients = $data['to'] ?? [];

            if (is_string($recipients)) {
                $recipients = [$recipients];
            }

            if (!is_array($recipients) || empty($recipients)) {
                throw new InvalidArgumentException('La liste des destinataires est invalide');
            }

            switch ($role) {
                case 'ROLE_STUDENT':
                    $role = "Étudiant";
                    break;
                case 'ROLE_COMPANY':
                    $role = "Entreprise";
                    break;
                case 'ROLE_ADMIN':
                    break;
            }

            switch ($type) {
                case 'create_account':
                    $template = 'emails/create_account_email.html.twig';
                    $subject = 'Création de votre compte';
                    break;
                case 'forgot_password':
                    $template = 'emails/forgot_password_email.html.twig';
                    $subject = 'Réinitialisation de votre mot de passe';
                    break;
                default:
                    throw new InvalidArgumentException('Type d\'email invalide');
            }

            $email = (new TemplatedEmail())
                ->from(new Address('BeConnect@beconnect.fr', 'No Reply BeConnect'))
                ->subject($subject)
                ->htmlTemplate($template)
                ->context([
                    'emailAccount' => $recipients[0],
                    'type' => $type,
                    'fullName' => $fullName,
                    'role' => $role,
                    'link' => $link,
                ]);

            // Ajout de tous les destinataires
            foreach ($recipients as $recipient) {
                $email->addTo(new Address($recipient));
            }

            $mailer->send($email);

            return $this->json([
                'status' => 'success',
                'message' => sprintf('Email envoyé avec succès à %d destinataire(s)', count($recipients))
            ]);

        } catch (\Exception $e) {
            return $this->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        } catch (TransportExceptionInterface $e) {
            return $this->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
