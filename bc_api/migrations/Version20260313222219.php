<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260313222219 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE apply (id INT AUTO_INCREMENT NOT NULL, message VARCHAR(255) NOT NULL, offer_id INT NOT NULL, student_id INT NOT NULL, statut_id INT NOT NULL, INDEX IDX_BD2F8C1F53C674EE (offer_id), INDEX IDX_BD2F8C1FCB944F1A (student_id), INDEX IDX_BD2F8C1FF6203804 (statut_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE offer (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, domain VARCHAR(255) NOT NULL, level INT NOT NULL, description VARCHAR(255) NOT NULL, mission VARCHAR(255) NOT NULL, start_date DATE NOT NULL, end_date DATE NOT NULL, duration VARCHAR(255) DEFAULT NULL, salary INT DEFAULT NULL, compensation INT DEFAULT NULL, rythm VARCHAR(255) NOT NULL, is_tele_working TINYINT NOT NULL, working_time INT NOT NULL, is_closed TINYINT NOT NULL, contract_id INT NOT NULL, place_id INT NOT NULL, company_id INT NOT NULL, UNIQUE INDEX UNIQ_29D6873E2576E0FD (contract_id), UNIQUE INDEX UNIQ_29D6873EDA6A219 (place_id), UNIQUE INDEX UNIQ_29D6873E979B1AD6 (company_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE offer_profilewanted (offer_id INT NOT NULL, profilewanted_id INT NOT NULL, INDEX IDX_F85B987D53C674EE (offer_id), INDEX IDX_F85B987D8E8CC262 (profilewanted_id), PRIMARY KEY (offer_id, profilewanted_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE offer_skill (offer_id INT NOT NULL, skill_id INT NOT NULL, INDEX IDX_DD10999E53C674EE (offer_id), INDEX IDX_DD10999E5585C142 (skill_id), PRIMARY KEY (offer_id, skill_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE profile_wanted (id INT AUTO_INCREMENT NOT NULL, libelle VARCHAR(255) NOT NULL, last_update_date DATETIME NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE skill (id INT AUTO_INCREMENT NOT NULL, libelle VARCHAR(255) NOT NULL, last_update_date DATETIME NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE statut (id INT AUTO_INCREMENT NOT NULL, libelle VARCHAR(255) NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE apply ADD CONSTRAINT FK_BD2F8C1F53C674EE FOREIGN KEY (offer_id) REFERENCES offer (id)');
        $this->addSql('ALTER TABLE apply ADD CONSTRAINT FK_BD2F8C1FCB944F1A FOREIGN KEY (student_id) REFERENCES student (id)');
        $this->addSql('ALTER TABLE apply ADD CONSTRAINT FK_BD2F8C1FF6203804 FOREIGN KEY (statut_id) REFERENCES statut (id)');
        $this->addSql('ALTER TABLE offer ADD CONSTRAINT FK_29D6873E2576E0FD FOREIGN KEY (contract_id) REFERENCES contract (id)');
        $this->addSql('ALTER TABLE offer ADD CONSTRAINT FK_29D6873EDA6A219 FOREIGN KEY (place_id) REFERENCES place (id)');
        $this->addSql('ALTER TABLE offer ADD CONSTRAINT FK_29D6873E979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
        $this->addSql('ALTER TABLE offer_profilewanted ADD CONSTRAINT FK_F85B987D53C674EE FOREIGN KEY (offer_id) REFERENCES offer (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE offer_profilewanted ADD CONSTRAINT FK_F85B987D8E8CC262 FOREIGN KEY (profilewanted_id) REFERENCES profile_wanted (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE offer_skill ADD CONSTRAINT FK_DD10999E53C674EE FOREIGN KEY (offer_id) REFERENCES offer (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE offer_skill ADD CONSTRAINT FK_DD10999E5585C142 FOREIGN KEY (skill_id) REFERENCES skill (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE contract ADD libelle VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE student ADD contract_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE student ADD CONSTRAINT FK_B723AF332576E0FD FOREIGN KEY (contract_id) REFERENCES contract (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_B723AF332576E0FD ON student (contract_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE apply DROP FOREIGN KEY FK_BD2F8C1F53C674EE');
        $this->addSql('ALTER TABLE apply DROP FOREIGN KEY FK_BD2F8C1FCB944F1A');
        $this->addSql('ALTER TABLE apply DROP FOREIGN KEY FK_BD2F8C1FF6203804');
        $this->addSql('ALTER TABLE offer DROP FOREIGN KEY FK_29D6873E2576E0FD');
        $this->addSql('ALTER TABLE offer DROP FOREIGN KEY FK_29D6873EDA6A219');
        $this->addSql('ALTER TABLE offer DROP FOREIGN KEY FK_29D6873E979B1AD6');
        $this->addSql('ALTER TABLE offer_profilewanted DROP FOREIGN KEY FK_F85B987D53C674EE');
        $this->addSql('ALTER TABLE offer_profilewanted DROP FOREIGN KEY FK_F85B987D8E8CC262');
        $this->addSql('ALTER TABLE offer_skill DROP FOREIGN KEY FK_DD10999E53C674EE');
        $this->addSql('ALTER TABLE offer_skill DROP FOREIGN KEY FK_DD10999E5585C142');
        $this->addSql('DROP TABLE apply');
        $this->addSql('DROP TABLE offer');
        $this->addSql('DROP TABLE offer_profilewanted');
        $this->addSql('DROP TABLE offer_skill');
        $this->addSql('DROP TABLE profile_wanted');
        $this->addSql('DROP TABLE skill');
        $this->addSql('DROP TABLE statut');
        $this->addSql('ALTER TABLE contract DROP libelle');
        $this->addSql('ALTER TABLE student DROP FOREIGN KEY FK_B723AF332576E0FD');
        $this->addSql('DROP INDEX UNIQ_B723AF332576E0FD ON student');
        $this->addSql('ALTER TABLE student DROP contract_id');
    }
}
