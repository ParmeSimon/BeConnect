<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Uid\Uuid;

class AccountController extends AbstractController
{
    #[Route('/account/forgot-password', name: 'account_forgot_password', methods: ['POST'])]
    public function forgotPassword(
        Request $request,
        UserRepository $userRepository,
        EntityManagerInterface $entityManager,
        MailerInterface $mailer,
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        $emailAddress = $data['email'] ?? null;

        $response = $this->json([
            'success' => true,
            'message' => 'Si cette adresse est associée à un compte, un email de réinitialisation a été envoyé.',
        ]);

        if (!$emailAddress) {
            return $response;
        }

        $user = $userRepository->findOneBy(['email' => $emailAddress]);

        if (!$user) {
            return $response;
        }

        $token = Uuid::v4()->toRfc4122();
        $user->setConfirmationToken($token);
        $entityManager->flush();

        $resetLink = ($data['frontUrl'] ?? 'http://localhost:3000') . '/activate-account?token=' . $token . '&type=forgot_password';

        $email = (new TemplatedEmail())
            ->from(new Address('BeConnect@beconnect.fr', 'No Reply BeConnect'))
            ->to(new Address($emailAddress))
            ->subject('Réinitialisation de votre mot de passe')
            ->htmlTemplate('emails/forgot_password_email.html.twig')
            ->context([
                'emailAccount' => $emailAddress,
                'link' => $resetLink,
            ]);

        $mailer->send($email);

        return $response;
    }

    #[Route('/account/change-password', name: 'account_change_password', methods: ['POST'])]
    public function changePassword(
        Request $request,
        UserRepository $userRepository,
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $oldPassword = $data['oldPassword'] ?? null;
        $newPassword = $data['newPassword'] ?? null;
        $email = $data['email'] ?? null;

        $user = $userRepository->findOneBy(['email' => $email]);

        if (!$passwordHasher->isPasswordValid($user, $oldPassword)) {
            return $this->json(['success' => false, 'message' => 'L\'ancien mot de passe est incorrect'], 400);
        }

        $user->setPassword($passwordHasher->hashPassword($user, $newPassword));

        $entityManager->flush();

        return $this->json(['success' => true, 'message' => 'Mot de passe mis à jour !']);
    }

    #[Route('/account/verify-token', name: 'account_verify_token', methods: ['POST'])]
    public function verifyToken(Request $request, UserRepository $userRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $token = $data['token'] ?? null;

        if (!$token) {
            return $this->json(['valid' => false, 'message' => 'Token manquant'], 400);
        }

        $user = $userRepository->findOneBy(['confirmationToken' => $token]);

        if (!$user) {
            return $this->json(['valid' => false, 'message' => 'Token invalide ou expiré'], 404);
        }

        return $this->json([
            'valid' => true,
            'email' => $user->getEmail(),
            'fullName' => $user->getFullName(),
        ]);
    }

    #[Route('/account/activate', name: 'account_activate', methods: ['POST'])]
    public function activate(
        Request $request,
        UserRepository $userRepository,
        UserPasswordHasherInterface $passwordHasher,
        EntityManagerInterface $entityManager,
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        $token = $data['token'] ?? null;
        $password = $data['password'] ?? null;

        if (!$token || !$password) {
            return $this->json(['success' => false, 'message' => 'Token et mot de passe requis'], 400);
        }

        if (strlen($password) < 8) {
            return $this->json(['success' => false, 'message' => 'Le mot de passe doit contenir au moins 8 caractères'], 400);
        }

        $user = $userRepository->findOneBy(['confirmationToken' => $token]);

        if (!$user) {
            return $this->json(['success' => false, 'message' => 'Token invalide ou expiré'], 404);
        }

        $hashedPassword = $passwordHasher->hashPassword($user, $password);
        $user->setPassword($hashedPassword);
        $user->setConfirmationToken(null);

        $entityManager->flush();

        return $this->json([
            'success' => true,
            'message' => 'Compte activé avec succès',
        ]);
    }
}
