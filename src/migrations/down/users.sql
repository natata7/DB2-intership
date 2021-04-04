START TRANSACTION;
CREATE TABLE public.users
(
    id bigint NOT NULL,
    fname text NOT NULL,
    lname text,
    login text NOT NULL,
    email text NOT NULL,
    country text,
    status text,
    level text,
    "categoryId" integer NOT NULL,
    PRIMARY KEY (id, "categoryId")
);

CREATE TABLE public.categories
(
    "categoryId" integer NOT NULL,
    name text NOT NULL,
    PRIMARY KEY ("categoryId")
);

ALTER TABLE public.users
    ADD FOREIGN KEY ("categoryId")
    REFERENCES public.categories ("categoryId")
    NOT VALID;
COMMIT;