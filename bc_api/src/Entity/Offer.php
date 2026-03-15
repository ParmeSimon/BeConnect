<?php

namespace App\Entity;

use App\Repository\OfferRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: OfferRepository::class)]
class Offer
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Contract $contract = null;

    #[ORM\Column(length: 255)]
    private ?string $domain = null;

    #[ORM\Column]
    private ?int $level = null;

    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    private ?string $mission = null;

    /**
     * @var Collection<int, ProfileWanted>
     */
    #[ORM\ManyToMany(targetEntity: ProfileWanted::class, inversedBy: 'offers')]
    private Collection $profileWanted;

    /**
     * @var Collection<int, Skill>
     */
    #[ORM\ManyToMany(targetEntity: Skill::class, inversedBy: 'offers')]
    private Collection $skill;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTime $startDate = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTime $endDate = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $duration = null;

    #[ORM\Column(nullable: true)]
    private ?int $salary = null;

    #[ORM\Column(nullable: true)]
    private ?int $compensation = null;

    #[ORM\Column(length: 255)]
    private ?string $rythm = null;

    #[ORM\Column]
    private ?bool $isTeleWorking = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Place $place = null;

    #[ORM\Column]
    private ?int $workingTime = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Company $company = null;

    #[ORM\Column]
    private ?bool $isClosed = null;

    /**
     * @var Collection<int, Apply>
     */
    #[ORM\OneToMany(targetEntity: Apply::class, mappedBy: 'offer')]
    private Collection $applies;

    public function __construct()
    {
        $this->profileWanted = new ArrayCollection();
        $this->skill = new ArrayCollection();
        $this->applies = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getContract(): ?Contract
    {
        return $this->contract;
    }

    public function setContract(Contract $contract): static
    {
        $this->contract = $contract;

        return $this;
    }

    public function getDomain(): ?string
    {
        return $this->domain;
    }

    public function setDomain(string $domain): static
    {
        $this->domain = $domain;

        return $this;
    }

    public function getLevel(): ?int
    {
        return $this->level;
    }

    public function setLevel(int $level): static
    {
        $this->level = $level;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getMission(): ?string
    {
        return $this->mission;
    }

    public function setMission(string $mission): static
    {
        $this->mission = $mission;

        return $this;
    }

    /**
     * @return Collection<int, ProfileWanted>
     */
    public function getProfileWanted(): Collection
    {
        return $this->profileWanted;
    }

    public function addProfileWanted(ProfileWanted $profileWanted): static
    {
        if (!$this->profileWanted->contains($profileWanted)) {
            $this->profileWanted->add($profileWanted);
        }

        return $this;
    }

    public function removeProfileWanted(ProfileWanted $profileWanted): static
    {
        $this->profileWanted->removeElement($profileWanted);

        return $this;
    }

    /**
     * @return Collection<int, Skill>
     */
    public function getSkill(): Collection
    {
        return $this->skill;
    }

    public function addSkill(Skill $skill): static
    {
        if (!$this->skill->contains($skill)) {
            $this->skill->add($skill);
        }

        return $this;
    }

    public function removeSkill(Skill $skill): static
    {
        $this->skill->removeElement($skill);

        return $this;
    }

    public function getStartDate(): ?\DateTime
    {
        return $this->startDate;
    }

    public function setStartDate(\DateTime $startDate): static
    {
        $this->startDate = $startDate;

        return $this;
    }

    public function getEndDate(): ?\DateTime
    {
        return $this->endDate;
    }

    public function setEndDate(\DateTime $endDate): static
    {
        $this->endDate = $endDate;

        return $this;
    }

    public function getDuration(): ?string
    {
        return $this->duration;
    }

    public function setDuration(?string $duration): static
    {
        $this->duration = $duration;

        return $this;
    }

    public function getSalary(): ?int
    {
        return $this->salary;
    }

    public function setSalary(?int $salary): static
    {
        $this->salary = $salary;

        return $this;
    }

    public function getCompensation(): ?int
    {
        return $this->compensation;
    }

    public function setCompensation(?int $compensation): static
    {
        $this->compensation = $compensation;

        return $this;
    }

    public function getRythm(): ?string
    {
        return $this->rythm;
    }

    public function setRythm(string $rythm): static
    {
        $this->rythm = $rythm;

        return $this;
    }

    public function isTeleWorking(): ?bool
    {
        return $this->isTeleWorking;
    }

    public function setIsTeleWorking(bool $isTeleWorking): static
    {
        $this->isTeleWorking = $isTeleWorking;

        return $this;
    }

    public function getPlace(): ?Place
    {
        return $this->place;
    }

    public function setPlace(Place $place): static
    {
        $this->place = $place;

        return $this;
    }

    public function getWorkingTime(): ?int
    {
        return $this->workingTime;
    }

    public function setWorkingTime(int $workingTime): static
    {
        $this->workingTime = $workingTime;

        return $this;
    }

    public function getCompany(): ?Company
    {
        return $this->company;
    }

    public function setCompany(Company $company): static
    {
        $this->company = $company;

        return $this;
    }

    public function isClosed(): ?bool
    {
        return $this->isClosed;
    }

    public function setIsClosed(bool $isClosed): static
    {
        $this->isClosed = $isClosed;

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
            $apply->setOffer($this);
        }

        return $this;
    }

    public function removeApply(Apply $apply): static
    {
        if ($this->applies->removeElement($apply)) {
            // set the owning side to null (unless already changed)
            if ($apply->getOffer() === $this) {
                $apply->setOffer(null);
            }
        }

        return $this;
    }
}
