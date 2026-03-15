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

#[Get()]
#[GetCollection()]
#[Post()]
#[Patch()]
#[Delete()]
#[ORM\Entity(repositoryClass: CompanyRepository::class)]
class Company
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $siret = null;

    #[ORM\Column(length: 255)]
    private ?string $jobFunction = null;

    #[ORM\Column(type: Types::BLOB, nullable: true)]
    private mixed $logo = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $sector = null;

    /**
     * @var Collection<int, Place>
     */
    #[ORM\ManyToMany(targetEntity: Place::class, inversedBy: 'companies')]
    private Collection $place;

    #[ORM\Column(nullable: true)]
    private ?int $sizeCompany = null;

    #[ORM\Column]
    private ?bool $isSearch = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $instagram = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $description = null;

    /**
     * @var Collection<int, Image>
     */
    #[ORM\ManyToMany(targetEntity: Image::class, inversedBy: 'companies')]
    private Collection $image;

    /**
     * @var Collection<int, User>
     */
    #[ORM\ManyToMany(targetEntity: User::class, mappedBy: 'company')]
    private Collection $users;

    public function __construct()
    {
        $this->place = new ArrayCollection();
        $this->image = new ArrayCollection();
        $this->users = new ArrayCollection();
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
        return $this->function;
    }

    public function setFunction(string $jobFunction): static
    {
        $this->function = $jobFunction;

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
}
