<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260405081641 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE company_administrator (company_id INT NOT NULL, administrator_id INT NOT NULL, INDEX IDX_24FD242C979B1AD6 (company_id), INDEX IDX_24FD242C4B09E92C (administrator_id), PRIMARY KEY (company_id, administrator_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE student_course (student_id INT NOT NULL, course_id INT NOT NULL, INDEX IDX_98A8B739CB944F1A (student_id), INDEX IDX_98A8B739591CC992 (course_id), PRIMARY KEY (student_id, course_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE company_administrator ADD CONSTRAINT FK_24FD242C979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE company_administrator ADD CONSTRAINT FK_24FD242C4B09E92C FOREIGN KEY (administrator_id) REFERENCES administrator (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE student_course ADD CONSTRAINT FK_98A8B739CB944F1A FOREIGN KEY (student_id) REFERENCES student (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE student_course ADD CONSTRAINT FK_98A8B739591CC992 FOREIGN KEY (course_id) REFERENCES course (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE apply ADD created_at DATETIME NOT NULL, ADD updated_at DATETIME NOT NULL');
        $this->addSql('ALTER TABLE offer ADD created_at DATETIME NOT NULL');
        $this->addSql('ALTER TABLE skill ADD administrator_id_id INT DEFAULT NULL, DROP last_update_date');
        $this->addSql('ALTER TABLE skill ADD CONSTRAINT FK_5E3DE477A1768AFE FOREIGN KEY (administrator_id_id) REFERENCES administrator (id)');
        $this->addSql('CREATE INDEX IDX_5E3DE477A1768AFE ON skill (administrator_id_id)');
        $this->addSql('ALTER TABLE student DROP FOREIGN KEY `FK_B723AF33591CC992`');
        $this->addSql('DROP INDEX IDX_B723AF33591CC992 ON student');
        $this->addSql('ALTER TABLE student ADD administrator_id_id INT DEFAULT NULL, DROP course_id');
        $this->addSql('ALTER TABLE student ADD CONSTRAINT FK_B723AF33A1768AFE FOREIGN KEY (administrator_id_id) REFERENCES administrator (id)');
        $this->addSql('CREATE INDEX IDX_B723AF33A1768AFE ON student (administrator_id_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE company_administrator DROP FOREIGN KEY FK_24FD242C979B1AD6');
        $this->addSql('ALTER TABLE company_administrator DROP FOREIGN KEY FK_24FD242C4B09E92C');
        $this->addSql('ALTER TABLE student_course DROP FOREIGN KEY FK_98A8B739CB944F1A');
        $this->addSql('ALTER TABLE student_course DROP FOREIGN KEY FK_98A8B739591CC992');
        $this->addSql('DROP TABLE company_administrator');
        $this->addSql('DROP TABLE student_course');
        $this->addSql('ALTER TABLE apply DROP created_at, DROP updated_at');
        $this->addSql('ALTER TABLE offer DROP created_at');
        $this->addSql('ALTER TABLE skill DROP FOREIGN KEY FK_5E3DE477A1768AFE');
        $this->addSql('DROP INDEX IDX_5E3DE477A1768AFE ON skill');
        $this->addSql('ALTER TABLE skill ADD last_update_date DATETIME NOT NULL, DROP administrator_id_id');
        $this->addSql('ALTER TABLE student DROP FOREIGN KEY FK_B723AF33A1768AFE');
        $this->addSql('DROP INDEX IDX_B723AF33A1768AFE ON student');
        $this->addSql('ALTER TABLE student ADD course_id INT NOT NULL, DROP administrator_id_id');
        $this->addSql('ALTER TABLE student ADD CONSTRAINT `FK_B723AF33591CC992` FOREIGN KEY (course_id) REFERENCES course (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_B723AF33591CC992 ON student (course_id)');
    }
}
