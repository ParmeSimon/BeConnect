<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260311145154 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE company_user DROP FOREIGN KEY `FK_CEFECCA7979B1AD6`');
        $this->addSql('ALTER TABLE company_user DROP FOREIGN KEY `FK_CEFECCA7A76ED395`');
        $this->addSql('DROP TABLE company_user');
        $this->addSql('ALTER TABLE administrator DROP FOREIGN KEY `FK_58DF0651A76ED395`');
        $this->addSql('DROP INDEX IDX_58DF0651A76ED395 ON administrator');
        $this->addSql('ALTER TABLE administrator DROP user_id');
        $this->addSql('ALTER TABLE student DROP INDEX IDX_B723AF33A76ED395, ADD UNIQUE INDEX UNIQ_B723AF33A76ED395 (user_id)');
        $this->addSql('ALTER TABLE user ADD company_id INT DEFAULT NULL, ADD administrator_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D6494B09E92C FOREIGN KEY (administrator_id) REFERENCES administrator (id)');
        $this->addSql('CREATE INDEX IDX_8D93D649979B1AD6 ON user (company_id)');
        $this->addSql('CREATE INDEX IDX_8D93D6494B09E92C ON user (administrator_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE company_user (company_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_CEFECCA7979B1AD6 (company_id), INDEX IDX_CEFECCA7A76ED395 (user_id), PRIMARY KEY (company_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_0900_ai_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE company_user ADD CONSTRAINT `FK_CEFECCA7979B1AD6` FOREIGN KEY (company_id) REFERENCES company (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE company_user ADD CONSTRAINT `FK_CEFECCA7A76ED395` FOREIGN KEY (user_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE administrator ADD user_id INT NOT NULL');
        $this->addSql('ALTER TABLE administrator ADD CONSTRAINT `FK_58DF0651A76ED395` FOREIGN KEY (user_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_58DF0651A76ED395 ON administrator (user_id)');
        $this->addSql('ALTER TABLE student DROP INDEX UNIQ_B723AF33A76ED395, ADD INDEX IDX_B723AF33A76ED395 (user_id)');
        $this->addSql('ALTER TABLE `user` DROP FOREIGN KEY FK_8D93D649979B1AD6');
        $this->addSql('ALTER TABLE `user` DROP FOREIGN KEY FK_8D93D6494B09E92C');
        $this->addSql('DROP INDEX IDX_8D93D649979B1AD6 ON `user`');
        $this->addSql('DROP INDEX IDX_8D93D6494B09E92C ON `user`');
        $this->addSql('ALTER TABLE `user` DROP company_id, DROP administrator_id');
    }
}
