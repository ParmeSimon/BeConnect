<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260422145811 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE offer ADD administrator_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE offer ADD CONSTRAINT FK_29D6873E4B09E92C FOREIGN KEY (administrator_id) REFERENCES administrator (id)');
        $this->addSql('CREATE INDEX IDX_29D6873E4B09E92C ON offer (administrator_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE offer DROP FOREIGN KEY FK_29D6873E4B09E92C');
        $this->addSql('DROP INDEX IDX_29D6873E4B09E92C ON offer');
        $this->addSql('ALTER TABLE offer DROP administrator_id');
    }
}
