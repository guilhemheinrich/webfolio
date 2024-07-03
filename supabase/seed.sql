DO $$
DECLARE
    rec RECORD;
BEGIN
    FOR rec IN
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public'
    LOOP
        EXECUTE 'TRUNCATE TABLE public.' || quote_ident(rec.tablename) || ' CASCADE';
    END LOOP;
END $$;
SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.6 (Ubuntu 15.6-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: webfolio_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: webfolio_languages; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."webfolio_languages" ("code", "fr_display") VALUES
	('zh', 'Chinois'),
	('es', 'Espagnol'),
	('en', 'Anglais'),
	('hi', 'Hindi'),
	('ar', 'Arabe'),
	('bn', 'Bengali'),
	('pt', 'Portugais'),
	('ru', 'Russe'),
	('ja', 'Japonais'),
	('de', 'Allemand'),
	('jv', 'Javanais'),
	('ko', 'Coréen'),
	('fr', 'Français'),
	('te', 'Telugu'),
	('mr', 'Marathi'),
	('tr', 'Turc'),
	('ta', 'Tamoul'),
	('vi', 'Vietnamien'),
	('ur', 'Ourdou'),
	('it', 'Italien');


--
-- Data for Name: webfolio_categories_label; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: webfolio_experience; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."webfolio_experience" ("slug", "created_date", "modified_date", "start_date", "end_date") VALUES
	('deepomics', '2024-07-03 15:33:16.474114+00', '2024-07-03 15:33:16.474114+00', '2022-07-01 15:32:42+00', '2023-12-13 16:33:03+00'),
	('qanopee', '2024-07-03 15:33:44.926876+00', '2024-07-03 15:33:44.926876+00', '2023-07-03 15:33:24+00', NULL);


--
-- Data for Name: webfolio_experience_description; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."webfolio_experience_description" ("id", "experience_slug", "content", "language_code") VALUES
	('cfb7011e-5940-4066-a32b-f87758b3ba74', 'deepomics', 'Deepomics est un système d''information pour des données de ...', 'fr'),
	('e0ebd961-093f-4862-9a8d-a7b4dd778895', 'qanopee', 'Qanopee est une plateforme de réservation en ligne pour des interventions non médicamenteuse', 'fr');


--
-- Data for Name: webfolio_experience_title; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."webfolio_experience_title" ("id", "experience_slug", "content", "language_code") VALUES
	('9403151b-368d-4a06-abf5-5438eeed0b9f', 'deepomics', 'Deepomics : un système d''information pour les données méta-omics', 'fr'),
	('e7323dd3-56f2-4f67-b5bf-73823d0304a6', 'qanopee', 'Qanopee : une plateforme SaaS b2c pour des prises de rendez-vous médical non médicamenteuse', 'fr');


--
-- PostgreSQL database dump complete
--

RESET ALL;

