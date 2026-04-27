<?php

namespace App\EventListener;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JWTCreatedListener
{
    public function onJWTCreated(JWTCreatedEvent $event): void
    {
        $user = $event->getUser();

        if (!$user instanceof User) {
            return;
        }

        $payload = $event->getData();
        $payload['fullName'] = $user->getFullName();
        $payload['userId'] = $user->getId();

        $student = $user->getStudent();
        if ($student !== null) {
            $payload['student'] = [
                'id' => $student->getId(),
                'logo' => $student->getLogo(),
                'nbSponsorship' => $student->getNbSponsorship(),
                'place' => $student->getPlace(),
                'mobility' => $student->getMobility(),
                'experiences' => $student->getExperiences(),
                'applies' => $student->getApplies(),
                'course' => $student->getCourse(),
                'linkedin' => $student->getLinkedin(),
                'website' => $student->getWebsite(),
            ];
        } elseif (!$user->getCompany()->isEmpty()) {
            $company = $user->getCompany()->first();
            $payload['company'] = [
                'id' => $company->getId(),
                'siret' => $company->getSiret(),
                'function' => $company->getFunction(),
                'sector' => $company->getSector(),
                'sizeCompany' => $company->getSizeCompany(),
                'isSearch' => $company->isSearch(),
                'logo' => $company->getLogo(),
                'description' => $company->getDescription(),
                'instagram' => $company->getInstagram(),
                'website' => $company->getWebsite(),
                'linkedin' => $company->getLinkedin(),
                'place' => $company->getPlace(),

            ];
        } elseif ($user->getAdministrator() !== null) {
            $administrator = $user->getAdministrator();
            $payload['administrator'] = [
                'id' => $administrator->getId(),
                'name' => $administrator->getName(),
                'logo' => $administrator->getLogo(),
                'description' => $administrator->getDescription(),
                'instagram' => $administrator->getInstagram(),
                'website' => $administrator->getWebsite(),
                'linkedin' => $administrator->getLinkedin(),
                'place' => array_map(
                    fn($p) => $p->getLibelle(),
                    $administrator->getPlace()->toArray()
                ),
                'slogan' => $administrator->getSlogan(),
            ];
        }
        $event->setData($payload);
    }
}
