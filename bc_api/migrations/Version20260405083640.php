<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260405083640 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE administrator_user (administrator_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_419BAA44B09E92C (administrator_id), INDEX IDX_419BAA4A76ED395 (user_id), PRIMARY KEY (administrator_id, user_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE administrator_user ADD CONSTRAINT FK_419BAA44B09E92C FOREIGN KEY (administrator_id) REFERENCES administrator (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE administrator_user ADD CONSTRAINT FK_419BAA4A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE administrator DROP FOREIGN KEY `FK_58DF0651A76ED395`');
        $this->addSql('DROP INDEX UNIQ_58DF0651A76ED395 ON administrator');
        $this->addSql('ALTER TABLE administrator DROP user_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE administrator_user DROP FOREIGN KEY FK_419BAA44B09E92C');
        $this->addSql('ALTER TABLE administrator_user DROP FOREIGN KEY FK_419BAA4A76ED395');
        $this->addSql('DROP TABLE administrator_user');
        $this->addSql('ALTER TABLE administrator ADD user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE administrator ADD CONSTRAINT `FK_58DF0651A76ED395` FOREIGN KEY (user_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_58DF0651A76ED395 ON administrator (user_id)');
    }
}
