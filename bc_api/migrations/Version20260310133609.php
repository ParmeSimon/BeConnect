<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260310133609 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE administrator (id INT AUTO_INCREMENT NOT NULL, logo LONGBLOB DEFAULT NULL, description VARCHAR(255) DEFAULT NULL, instagram VARCHAR(255) DEFAULT NULL, user_id INT NOT NULL, INDEX IDX_58DF0651A76ED395 (user_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE administrator_place (administrator_id INT NOT NULL, place_id INT NOT NULL, INDEX IDX_AA2F47644B09E92C (administrator_id), INDEX IDX_AA2F4764DA6A219 (place_id), PRIMARY KEY (administrator_id, place_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE company (id INT AUTO_INCREMENT NOT NULL, siret VARCHAR(255) NOT NULL, job_function VARCHAR(255) NOT NULL, logo LONGBLOB DEFAULT NULL, sector VARCHAR(255) DEFAULT NULL, size_company INT DEFAULT NULL, is_search TINYINT NOT NULL, instagram VARCHAR(255) DEFAULT NULL, description VARCHAR(255) DEFAULT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE company_user (company_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_CEFECCA7979B1AD6 (company_id), INDEX IDX_CEFECCA7A76ED395 (user_id), PRIMARY KEY (company_id, user_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE company_place (company_id INT NOT NULL, place_id INT NOT NULL, INDEX IDX_33ECF1A8979B1AD6 (company_id), INDEX IDX_33ECF1A8DA6A219 (place_id), PRIMARY KEY (company_id, place_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE company_image (company_id INT NOT NULL, image_id INT NOT NULL, INDEX IDX_82CCA63A979B1AD6 (company_id), INDEX IDX_82CCA63A3DA5256D (image_id), PRIMARY KEY (company_id, image_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE contract (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE course (id INT AUTO_INCREMENT NOT NULL, libelle VARCHAR(255) NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE experience (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, company_name VARCHAR(255) NOT NULL, is_working TINYINT NOT NULL, start_date DATE NOT NULL, end_date DATE NOT NULL, student_id INT DEFAULT NULL, place_id INT DEFAULT NULL, contract_id INT NOT NULL, INDEX IDX_590C103CB944F1A (student_id), INDEX IDX_590C103DA6A219 (place_id), INDEX IDX_590C1032576E0FD (contract_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE image (id INT AUTO_INCREMENT NOT NULL, link LONGBLOB NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE place (id INT AUTO_INCREMENT NOT NULL, libelle VARCHAR(255) NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE student (id INT AUTO_INCREMENT NOT NULL, logo LONGBLOB DEFAULT NULL, nb_sponsorship INT NOT NULL, mobility INT DEFAULT NULL, description VARCHAR(255) DEFAULT NULL, github VARCHAR(255) DEFAULT NULL, user_id INT DEFAULT NULL, course_id INT NOT NULL, place_id INT DEFAULT NULL, INDEX IDX_B723AF33A76ED395 (user_id), INDEX IDX_B723AF33591CC992 (course_id), INDEX IDX_B723AF33DA6A219 (place_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE administrator ADD CONSTRAINT FK_58DF0651A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE administrator_place ADD CONSTRAINT FK_AA2F47644B09E92C FOREIGN KEY (administrator_id) REFERENCES administrator (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE administrator_place ADD CONSTRAINT FK_AA2F4764DA6A219 FOREIGN KEY (place_id) REFERENCES place (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE company_user ADD CONSTRAINT FK_CEFECCA7979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE company_user ADD CONSTRAINT FK_CEFECCA7A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE company_place ADD CONSTRAINT FK_33ECF1A8979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE company_place ADD CONSTRAINT FK_33ECF1A8DA6A219 FOREIGN KEY (place_id) REFERENCES place (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE company_image ADD CONSTRAINT FK_82CCA63A979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE company_image ADD CONSTRAINT FK_82CCA63A3DA5256D FOREIGN KEY (image_id) REFERENCES image (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE experience ADD CONSTRAINT FK_590C103CB944F1A FOREIGN KEY (student_id) REFERENCES student (id)');
        $this->addSql('ALTER TABLE experience ADD CONSTRAINT FK_590C103DA6A219 FOREIGN KEY (place_id) REFERENCES place (id)');
        $this->addSql('ALTER TABLE experience ADD CONSTRAINT FK_590C1032576E0FD FOREIGN KEY (contract_id) REFERENCES contract (id)');
        $this->addSql('ALTER TABLE student ADD CONSTRAINT FK_B723AF33A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE student ADD CONSTRAINT FK_B723AF33591CC992 FOREIGN KEY (course_id) REFERENCES course (id)');
        $this->addSql('ALTER TABLE student ADD CONSTRAINT FK_B723AF33DA6A219 FOREIGN KEY (place_id) REFERENCES place (id)');
        $this->addSql('ALTER TABLE user ADD full_name VARCHAR(255) NOT NULL, ADD failed_attemps INT NOT NULL, ADD website VARCHAR(255) DEFAULT NULL, ADD linkedin VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE administrator DROP FOREIGN KEY FK_58DF0651A76ED395');
        $this->addSql('ALTER TABLE administrator_place DROP FOREIGN KEY FK_AA2F47644B09E92C');
        $this->addSql('ALTER TABLE administrator_place DROP FOREIGN KEY FK_AA2F4764DA6A219');
        $this->addSql('ALTER TABLE company_user DROP FOREIGN KEY FK_CEFECCA7979B1AD6');
        $this->addSql('ALTER TABLE company_user DROP FOREIGN KEY FK_CEFECCA7A76ED395');
        $this->addSql('ALTER TABLE company_place DROP FOREIGN KEY FK_33ECF1A8979B1AD6');
        $this->addSql('ALTER TABLE company_place DROP FOREIGN KEY FK_33ECF1A8DA6A219');
        $this->addSql('ALTER TABLE company_image DROP FOREIGN KEY FK_82CCA63A979B1AD6');
        $this->addSql('ALTER TABLE company_image DROP FOREIGN KEY FK_82CCA63A3DA5256D');
        $this->addSql('ALTER TABLE experience DROP FOREIGN KEY FK_590C103CB944F1A');
        $this->addSql('ALTER TABLE experience DROP FOREIGN KEY FK_590C103DA6A219');
        $this->addSql('ALTER TABLE experience DROP FOREIGN KEY FK_590C1032576E0FD');
        $this->addSql('ALTER TABLE student DROP FOREIGN KEY FK_B723AF33A76ED395');
        $this->addSql('ALTER TABLE student DROP FOREIGN KEY FK_B723AF33591CC992');
        $this->addSql('ALTER TABLE student DROP FOREIGN KEY FK_B723AF33DA6A219');
        $this->addSql('DROP TABLE administrator');
        $this->addSql('DROP TABLE administrator_place');
        $this->addSql('DROP TABLE company');
        $this->addSql('DROP TABLE company_user');
        $this->addSql('DROP TABLE company_place');
        $this->addSql('DROP TABLE company_image');
        $this->addSql('DROP TABLE contract');
        $this->addSql('DROP TABLE course');
        $this->addSql('DROP TABLE experience');
        $this->addSql('DROP TABLE image');
        $this->addSql('DROP TABLE place');
        $this->addSql('DROP TABLE student');
        $this->addSql('ALTER TABLE `user` DROP full_name, DROP failed_attemps, DROP website, DROP linkedin');
    }
}
