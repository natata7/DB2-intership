START TRANSACTION;
ALTER TABLE public.users
    ADD FOREIGN KEY ("categoryId")
    REFERENCES public.categories ("categoryId")
    NOT VALID;
COMMIT;