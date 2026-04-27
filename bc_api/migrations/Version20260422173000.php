<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20260422173000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Rename offer.administrator_id_id to administrator_id';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE offer DROP FOREIGN KEY FK_29D6873EA1768AFE');
        $this->addSql('DROP INDEX IDX_29D6873EA1768AFE ON offer');
        $this->addSql('ALTER TABLE offer CHANGE administrator_id_id administrator_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE offer ADD CONSTRAINT FK_29D6873E4B09E92C FOREIGN KEY (administrator_id) REFERENCES administrator (id)');
        $this->addSql('CREATE INDEX IDX_29D6873E4B09E92C ON offer (administrator_id)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE offer DROP FOREIGN KEY FK_29D6873E4B09E92C');
        $this->addSql('DROP INDEX IDX_29D6873E4B09E92C ON offer');
        $this->addSql('ALTER TABLE offer CHANGE administrator_id administrator_id_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE offer ADD CONSTRAINT FK_29D6873EA1768AFE FOREIGN KEY (administrator_id_id) REFERENCES administrator (id)');
        $this->addSql('CREATE INDEX IDX_29D6873EA1768AFE ON offer (administrator_id_id)');
    }
}
