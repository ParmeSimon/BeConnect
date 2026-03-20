<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use App\Controller\MailerController;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    operations: [
        new Post(
            uriTemplate: '/emails',
            controller: MailerController::class,
            name: 'send_email'
        )
    ]
)]
class Email
{
    #[Assert\NotBlank(message: "La liste des destinataires ne peut pas être vide")]
    #[Assert\All([
        new Assert\Email(message: "L'email '{{ value }}' n'est pas valide")
    ])]
    public array $to = [];

    #[Assert\NotBlank]
    public string $fullName;

    #[Assert\NotBlank]
    public string $type;


    #[Assert\NotBlank]
    public string $role;

    #[Assert\NotBlank]
    public string $link;

    #[Assert\NotBlank]
    public string $confirmationToken;

}
