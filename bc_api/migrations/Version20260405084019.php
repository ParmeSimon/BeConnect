<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260405084019 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user ADD administrator_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D6494B09E92C FOREIGN KEY (administrator_id) REFERENCES administrator (id)');
        $this->addSql('CREATE INDEX IDX_8D93D6494B09E92C ON user (administrator_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE `user` DROP FOREIGN KEY FK_8D93D6494B09E92C');
        $this->addSql('DROP INDEX IDX_8D93D6494B09E92C ON `user`');
        $this->addSql('ALTER TABLE `user` DROP administrator_id');
    }
}
