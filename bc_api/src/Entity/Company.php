<?php

namespace App\Entity;

use App\Repository\CompanyRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Attribute\Groups;

#[Get()]
#[GetCollection()]
#[Post()]
#[Patch()]
#[Delete()]
#[ORM\Entity(repositoryClass: CompanyRepository::class)]
#[ApiResource(normalizationContext: ['groups' => ['company:read']], denormalizationContext: ['groups' => ['company:write']])]
class Company
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['company:read', 'company:write'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['company:read', 'company:write'])]
    private ?string $siret = null;

    #[ORM\Column(length: 255)]
    #[Groups(['company:read', 'company:write'])]
    private ?string $jobFunction = null;

    #[ORM\Column(type: Types::BLOB, nullable: true)]
    #[Groups(['company:read', 'company:write'])]
    private mixed $logo = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['company:read', 'company:write'])]
    private ?string $sector = null;

    /**
     * @var Collection<int, Place>
     */
    #[ORM\ManyToMany(targetEntity: Place::class, inversedBy: 'companies')]
    #[Groups(['company:read', 'company:write'])]
    private Collection $place;

    #[ORM\Column(nullable: true)]
    #[Groups(['company:read', 'company:write'])]
    private ?int $sizeCompany = null;

    #[ORM\Column]
    #[Groups(['company:read', 'company:write'])]
    private ?bool $isSearch = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['company:read', 'company:write'])]
    private ?string $instagram = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['company:read', 'company:write'])]
    private ?string $description = null;

    /**
     * @var Collection<int, Image>
     */
    #[ORM\ManyToMany(targetEntity: Image::class, inversedBy: 'companies')]
    #[Groups(['company:read', 'company:write'])]
    private Collection $image;

    /**
     * @var Collection<int, User>
     */
    #[ORM\ManyToMany(targetEntity: User::class, mappedBy: 'company')]
    #[Groups(['company:read', 'company:write'])]
    private Collection $users;

    /**
     * @var Collection<int, administrator>
     */
    #[ORM\ManyToMany(targetEntity: administrator::class, inversedBy: 'companies')]
    #[Groups(['company:read', 'company:write'])]
    private Collection $administratorId;

    #[ORM\Column(length: 255)]
    #[Groups(['company:read', 'company:write'])]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['company:read', 'company:write'])]
    private ?string $website = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['company:read', 'company:write'])]
    private ?string $linkedin = null;

    #[ORM\Column]
    private ?bool $isValidate = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    public function __construct()
    {
        $this->place = new ArrayCollection();
        $this->image = new ArrayCollection();
        $this->users = new ArrayCollection();
        $this->administratorId = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSiret(): ?string
    {
        return $this->siret;
    }

    public function setSiret(string $siret): static
    {
        $this->siret = $siret;

        return $this;
    }

    public function getFunction(): ?string
    {
        return $this->jobFunction;
    }

    public function setFunction(string $jobFunction): static
    {
        $this->jobFunction = $jobFunction;

        return $this;
    }

    public function getLogo(): mixed
    {
        return $this->logo;
    }

    public function setLogo(mixed $logo): static
    {
        $this->logo = $logo;

        return $this;
    }

    public function getSector(): ?string
    {
        return $this->sector;
    }

    public function setSector(?string $sector): static
    {
        $this->sector = $sector;

        return $this;
    }

    /**
     * @return Collection<int, Place>
     */
    public function getPlace(): Collection
    {
        return $this->place;
    }

    public function addPlace(Place $place): static
    {
        if (!$this->place->contains($place)) {
            $this->place->add($place);
        }

        return $this;
    }

    public function removePlace(Place $place): static
    {
        $this->place->removeElement($place);

        return $this;
    }

    public function getSizeCompany(): ?int
    {
        return $this->sizeCompany;
    }

    public function setSizeCompany(?int $sizeCompany): static
    {
        $this->sizeCompany = $sizeCompany;

        return $this;
    }

    public function isSearch(): ?bool
    {
        return $this->isSearch;
    }

    public function setIsSearch(bool $isSearch): static
    {
        $this->isSearch = $isSearch;

        return $this;
    }

    public function getInstagram(): ?string
    {
        return $this->instagram;
    }

    public function setInstagram(?string $instagram): static
    {
        $this->instagram = $instagram;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection<int, Image>
     */
    public function getImage(): Collection
    {
        return $this->image;
    }

    public function addImage(Image $image): static
    {
        if (!$this->image->contains($image)) {
            $this->image->add($image);
        }

        return $this;
    }

    public function removeImage(Image $image): static
    {
        $this->image->removeElement($image);

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): static
    {
        if (!$this->users->contains($user)) {
            $this->users->add($user);
            $user->addCompany($this);
        }

        return $this;
    }

    public function removeUser(User $user): static
    {
        if ($this->users->removeElement($user)) {
            $user->removeCompany($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, administrator>
     */
    public function getAdministratorId(): Collection
    {
        return $this->administratorId;
    }

    public function addAdministratorId(administrator $administratorId): static
    {
        if (!$this->administratorId->contains($administratorId)) {
            $this->administratorId->add($administratorId);
        }

        return $this;
    }

    public function removeAdministratorId(administrator $administratorId): static
    {
        $this->administratorId->removeElement($administratorId);

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getWebsite(): ?string
    {
        return $this->website;
    }

    public function setWebsite(?string $website): static
    {
        $this->website = $website;

        return $this;
    }

    public function getLinkedin(): ?string
    {
        return $this->linkedin;
    }

    public function setLinkedin(?string $linkedin): static
    {
        $this->linkedin = $linkedin;

        return $this;
    }

    public function isValidate(): ?bool
    {
        return $this->isValidate;
    }

    public function setIsValidate(bool $isValidate): static
    {
        $this->isValidate = $isValidate;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}
