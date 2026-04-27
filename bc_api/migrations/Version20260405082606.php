<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260405082606 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE skill DROP FOREIGN KEY `FK_5E3DE477A1768AFE`');
        $this->addSql('DROP INDEX IDX_5E3DE477A1768AFE ON skill');
        $this->addSql('ALTER TABLE skill CHANGE administrator_id_id administrator_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE skill ADD CONSTRAINT FK_5E3DE4774B09E92C FOREIGN KEY (administrator_id) REFERENCES administrator (id)');
        $this->addSql('CREATE INDEX IDX_5E3DE4774B09E92C ON skill (administrator_id)');
        $this->addSql('ALTER TABLE student DROP FOREIGN KEY `FK_B723AF33A1768AFE`');
        $this->addSql('DROP INDEX IDX_B723AF33A1768AFE ON student');
        $this->addSql('ALTER TABLE student CHANGE administrator_id_id administrator_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE student ADD CONSTRAINT FK_B723AF334B09E92C FOREIGN KEY (administrator_id) REFERENCES administrator (id)');
        $this->addSql('CREATE INDEX IDX_B723AF334B09E92C ON student (administrator_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE skill DROP FOREIGN KEY FK_5E3DE4774B09E92C');
        $this->addSql('DROP INDEX IDX_5E3DE4774B09E92C ON skill');
        $this->addSql('ALTER TABLE skill CHANGE administrator_id administrator_id_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE skill ADD CONSTRAINT `FK_5E3DE477A1768AFE` FOREIGN KEY (administrator_id_id) REFERENCES administrator (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_5E3DE477A1768AFE ON skill (administrator_id_id)');
        $this->addSql('ALTER TABLE student DROP FOREIGN KEY FK_B723AF334B09E92C');
        $this->addSql('DROP INDEX IDX_B723AF334B09E92C ON student');
        $this->addSql('ALTER TABLE student CHANGE administrator_id administrator_id_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE student ADD CONSTRAINT `FK_B723AF33A1768AFE` FOREIGN KEY (administrator_id_id) REFERENCES administrator (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_B723AF33A1768AFE ON student (administrator_id_id)');
    }
}
