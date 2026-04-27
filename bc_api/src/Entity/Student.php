<?php

namespace App\Entity;

use App\Repository\StudentRepository;
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
#[ApiResource(normalizationContext: ['groups' => ['student:read']], denormalizationContext: ['groups' => ['student:write']])]
#[ORM\Entity(repositoryClass: StudentRepository::class)]
class Student
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['student:read'])]
    private ?int $id = null;

    #[ORM\Column(type: Types::BLOB, nullable: true)]
    #[Groups(['student:read', 'student:write'])]
    private mixed $logo = null;

    #[ORM\Column]
    #[Groups(['student:read', 'student:write', 'user:write'])]
    private ?int $nbSponsorship = null;

    #[ORM\ManyToOne(inversedBy: 'students')]
    #[Groups(['student:read'])]
    private ?Place $place = null;

    #[ORM\ManyToOne(inversedBy: 'students')]
    private ?Administrator $administrator = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['student:read', 'student:write'])]
    private ?int $mobility = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['student:read', 'student:write'])]
    private ?string $description = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['student:read', 'student:write'])]
    private ?string $github = null;

    /**
     * @var Collection<int, Experience>
     */
    #[ORM\OneToMany(targetEntity: Experience::class, mappedBy: 'student')]
    #[Groups(['student:read', 'student:write'])]
    private Collection $experiences;

    #[ORM\OneToOne(inversedBy: 'student', cascade: ['persist', 'remove'])]
    #[Groups(['student:read', 'student:write'])]
    private ?User $user = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[Groups(['student:read', 'student:write'])]
    private ?Contract $contract = null;

    /**
     * @var Collection<int, Apply>
     */
    #[ORM\OneToMany(targetEntity: Apply::class, mappedBy: 'student')]
    #[Groups(['student:read', 'student:write'])]
    private Collection $applies;

    /**
     * @var Collection<int, Course>
     */
    #[ORM\ManyToMany(targetEntity: Course::class, inversedBy: 'students')]
    #[Groups(['student:read', 'student:write'])]
    private Collection $course;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['student:read', 'student:write'])]
    private ?string $linkedin = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['student:read', 'student:write'])]
    private ?string $website = null;

    public function __construct()
    {
        $this->experiences = new ArrayCollection();
        $this->applies = new ArrayCollection();
        $this->course = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getNbSponsorship(): ?int
    {
        return $this->nbSponsorship;
    }

    public function setNbSponsorship(int $nbSponsorship): static
    {
        $this->nbSponsorship = $nbSponsorship;

        return $this;
    }

    public function getPlace(): ?Place
    {
        return $this->place;
    }

    public function setPlace(?Place $place): static
    {
        $this->place = $place;

        return $this;
    }

    public function getAdministrator(): ?Administrator
    {
        return $this->administrator;
    }

    public function setAdministrator(?Administrator $administrator): static
    {
        $this->administrator = $administrator;

        return $this;
    }

    public function getMobility(): ?int
    {
        return $this->mobility;
    }

    public function setMobility(?int $mobility): static
    {
        $this->mobility = $mobility;

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

    public function getGithub(): ?string
    {
        return $this->github;
    }

    public function setGithub(?string $github): static
    {
        $this->github = $github;

        return $this;
    }

    /**
     * @return Collection<int, Experience>
     */
    public function getExperiences(): Collection
    {
        return $this->experiences;
    }

    public function addExperience(Experience $experience): static
    {
        if (!$this->experiences->contains($experience)) {
            $this->experiences->add($experience);
            $experience->setStudent($this);
        }

        return $this;
    }

    public function removeExperience(Experience $experience): static
    {
        if ($this->experiences->removeElement($experience)) {
            // set the owning side to null (unless already changed)
            if ($experience->getStudent() === $this) {
                $experience->setStudent(null);
            }
        }

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getContract(): ?Contract
    {
        return $this->contract;
    }

    public function setContract(?Contract $contract): static
    {
        $this->contract = $contract;

        return $this;
    }

    /**
     * @return Collection<int, Apply>
     */
    public function getApplies(): Collection
    {
        return $this->applies;
    }

    public function addApply(Apply $apply): static
    {
        if (!$this->applies->contains($apply)) {
            $this->applies->add($apply);
            $apply->setStudent($this);
        }

        return $this;
    }

    public function removeApply(Apply $apply): static
    {
        if ($this->applies->removeElement($apply)) {
            // set the owning side to null (unless already changed)
            if ($apply->getStudent() === $this) {
                $apply->setStudent(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Course>
     */
    public function getCourse(): Collection
    {
        return $this->course;
    }

    public function addCourse(Course $course): static
    {
        if (!$this->course->contains($course)) {
            $this->course->add($course);
        }

        return $this;
    }

    public function removeCourse(Course $course): static
    {
        $this->course->removeElement($course);

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

    public function getWebsite(): ?string
    {
        return $this->website;
    }

    public function setWebsite(?string $website): static
    {
        $this->website = $website;

        return $this;
    }
}
