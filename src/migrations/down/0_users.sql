START TRANSACTION;
  ALTER TABLE "user" DROP CONSTRAINT  category;
  ALTER TABLE "user" DROP  categoryId;

  DROP TABLE category;
COMMIT;