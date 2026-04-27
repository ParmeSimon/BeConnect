<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260421122116 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE administrator ADD website VARCHAR(255) DEFAULT NULL, ADD linkedin VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE company ADD website VARCHAR(255) DEFAULT NULL, ADD linkedin VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE student ADD linkedin VARCHAR(255) DEFAULT NULL, ADD website VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE user DROP website, DROP linkedin');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE administrator DROP website, DROP linkedin');
        $this->addSql('ALTER TABLE company DROP website, DROP linkedin');
        $this->addSql('ALTER TABLE student DROP linkedin, DROP website');
        $this->addSql('ALTER TABLE `user` ADD website VARCHAR(255) DEFAULT NULL, ADD linkedin VARCHAR(255) DEFAULT NULL');
    }
}
