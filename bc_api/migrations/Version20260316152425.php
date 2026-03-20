<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260316152425 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE offer_profile_wanted (offer_id INT NOT NULL, profile_wanted_id INT NOT NULL, INDEX IDX_2647528453C674EE (offer_id), INDEX IDX_26475284E5B90FC8 (profile_wanted_id), PRIMARY KEY (offer_id, profile_wanted_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE offer_profile_wanted ADD CONSTRAINT FK_2647528453C674EE FOREIGN KEY (offer_id) REFERENCES offer (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE offer_profile_wanted ADD CONSTRAINT FK_26475284E5B90FC8 FOREIGN KEY (profile_wanted_id) REFERENCES profile_wanted (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE offer_profilewanted DROP FOREIGN KEY `FK_F85B987D53C674EE`');
        $this->addSql('ALTER TABLE offer_profilewanted DROP FOREIGN KEY `FK_F85B987D8E8CC262`');
        $this->addSql('DROP TABLE offer_profilewanted');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE offer_profilewanted (offer_id INT NOT NULL, profilewanted_id INT NOT NULL, INDEX IDX_F85B987D53C674EE (offer_id), INDEX IDX_F85B987D8E8CC262 (profilewanted_id), PRIMARY KEY (offer_id, profilewanted_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_0900_ai_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE offer_profilewanted ADD CONSTRAINT `FK_F85B987D53C674EE` FOREIGN KEY (offer_id) REFERENCES offer (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE offer_profilewanted ADD CONSTRAINT `FK_F85B987D8E8CC262` FOREIGN KEY (profilewanted_id) REFERENCES profile_wanted (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE offer_profile_wanted DROP FOREIGN KEY FK_2647528453C674EE');
        $this->addSql('ALTER TABLE offer_profile_wanted DROP FOREIGN KEY FK_26475284E5B90FC8');
        $this->addSql('DROP TABLE offer_profile_wanted');
    }
}
