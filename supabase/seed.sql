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
-- Data for Name: webfolio_text_traduction; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."webfolio_text_traduction" ("_id", "content", "language_code") VALUES
	('dc8385f3-e506-4e59-95a1-4cfc7f9d6fd3', 'Lorem Ipsum', 'fr'),
	('bb9b20b4-b966-45f5-8aab-fdddc3f8dca1', 'Lorem Ipsum', 'en'),
	('4615d92e-87b8-4f27-a7b2-57db16b9226b', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in posuere orci. Aliquam congue arcu sed ipsum convallis laoreet. Pellentesque rutrum imperdiet elit, vitae feugiat tellus sodales a. Phasellus non bibendum arcu. Ut id arcu id leo rutrum sodales placerat id justo. Duis congue risus ut metus varius iaculis. Sed quis venenatis felis, in sagittis risus.

Morbi maximus porttitor imperdiet. Ut luctus dapibus leo tristique venenatis. Vivamus vulputate maximus augue, ac rhoncus lacus. Etiam scelerisque eros vel eros lobortis, ac placerat ligula aliquam. Integer in eleifend est. Quisque cursus aliquet porttitor. Nam ac dolor pellentesque, dictum risus quis, blandit erat.

Nulla facilisi. Maecenas in sodales mi. Sed ullamcorper libero at dolor maximus consequat. Sed enim elit, posuere sed mollis ut, laoreet nec odio. Curabitur ut finibus massa, id luctus justo. Integer pharetra, felis sed faucibus pellentesque, leo justo cursus lacus, in porta mi urna sed lacus. In scelerisque laoreet neque, et eleifend leo dapibus id. Duis tempus elementum arcu, at sodales odio consectetur eget. Aenean congue eros vitae velit tincidunt, quis elementum augue porttitor. Nam lobortis, arcu at vestibulum tempor, nisi est imperdiet erat, imperdiet facilisis risus arcu quis ipsum. Curabitur ut quam lacinia, faucibus diam nec, dictum sapien. Phasellus eget odio ante. Proin sit amet risus vitae purus bibendum ultricies. Donec eget cursus massa. Praesent vestibulum malesuada turpis vitae ullamcorper.

Nunc tincidunt varius pellentesque. Nullam quis placerat felis. Nullam eu leo eget dolor interdum pellentesque. Mauris et ex purus. Morbi dictum erat urna, a semper erat dapibus vitae. Aliquam erat volutpat. Etiam tempus sodales feugiat. Nulla ut nisl quam. Donec eu dui quis enim consectetur volutpat. Integer bibendum scelerisque ipsum, quis tempor arcu ultricies ut. Morbi faucibus, mi ultricies eleifend pulvinar, nisi purus rutrum massa, non tincidunt risus sem nec neque. Cras quis auctor elit, sed mattis nisi. Morbi quis dapibus nunc. Nullam rutrum nibh ac egestas placerat.

Aliquam cursus placerat augue, vel varius turpis vestibulum at. Nulla tellus neque, porta vel egestas quis, semper id sapien. Donec eu tellus vel quam scelerisque iaculis. Vivamus dapibus orci in nibh porttitor interdum. Nulla tincidunt mollis nulla, in venenatis diam. Nam venenatis ipsum lobortis mauris placerat ultrices. Donec ultrices aliquam massa facilisis lobortis. Maecenas quis risus eu augue volutpat fermentum a ac arcu.', 'fr'),
	('9db04994-e686-41ca-b415-d2130ec89c7a', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in posuere orci. Aliquam congue arcu sed ipsum convallis laoreet. Pellentesque rutrum imperdiet elit, vitae feugiat tellus sodales a. Phasellus non bibendum arcu. Ut id arcu id leo rutrum sodales placerat id justo. Duis congue risus ut metus varius iaculis. Sed quis venenatis felis, in sagittis risus.

Morbi maximus porttitor imperdiet. Ut luctus dapibus leo tristique venenatis. Vivamus vulputate maximus augue, ac rhoncus lacus. Etiam scelerisque eros vel eros lobortis, ac placerat ligula aliquam. Integer in eleifend est. Quisque cursus aliquet porttitor. Nam ac dolor pellentesque, dictum risus quis, blandit erat.

Nulla facilisi. Maecenas in sodales mi. Sed ullamcorper libero at dolor maximus consequat. Sed enim elit, posuere sed mollis ut, laoreet nec odio. Curabitur ut finibus massa, id luctus justo. Integer pharetra, felis sed faucibus pellentesque, leo justo cursus lacus, in porta mi urna sed lacus. In scelerisque laoreet neque, et eleifend leo dapibus id. Duis tempus elementum arcu, at sodales odio consectetur eget. Aenean congue eros vitae velit tincidunt, quis elementum augue porttitor. Nam lobortis, arcu at vestibulum tempor, nisi est imperdiet erat, imperdiet facilisis risus arcu quis ipsum. Curabitur ut quam lacinia, faucibus diam nec, dictum sapien. Phasellus eget odio ante. Proin sit amet risus vitae purus bibendum ultricies. Donec eget cursus massa. Praesent vestibulum malesuada turpis vitae ullamcorper.

Nunc tincidunt varius pellentesque. Nullam quis placerat felis. Nullam eu leo eget dolor interdum pellentesque. Mauris et ex purus. Morbi dictum erat urna, a semper erat dapibus vitae. Aliquam erat volutpat. Etiam tempus sodales feugiat. Nulla ut nisl quam. Donec eu dui quis enim consectetur volutpat. Integer bibendum scelerisque ipsum, quis tempor arcu ultricies ut. Morbi faucibus, mi ultricies eleifend pulvinar, nisi purus rutrum massa, non tincidunt risus sem nec neque. Cras quis auctor elit, sed mattis nisi. Morbi quis dapibus nunc. Nullam rutrum nibh ac egestas placerat.

Aliquam cursus placerat augue, vel varius turpis vestibulum at. Nulla tellus neque, porta vel egestas quis, semper id sapien. Donec eu tellus vel quam scelerisque iaculis. Vivamus dapibus orci in nibh porttitor interdum. Nulla tincidunt mollis nulla, in venenatis diam. Nam venenatis ipsum lobortis mauris placerat ultrices. Donec ultrices aliquam massa facilisis lobortis. Maecenas quis risus eu augue volutpat fermentum a ac arcu.', 'en'),
	('764675ba-8c9b-43d0-af43-4a7eabdcf509', 'Web Development', 'en'),
	('61787b70-e571-494f-a4e8-c962b25a69a1', 'Développement Web', 'fr'),
	('8b3ed740-f1b1-4406-a7af-73c2dc4041bf', 'Statistics', 'en'),
	('102e7121-f18d-4b7f-aba2-62ce026ae5cb', 'Statistiques', 'fr');


--
-- Data for Name: webfolio_categories_label; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: webfolio_experience; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."webfolio_experience" ("_id", "created_date", "modified_date", "start_date", "end_date") VALUES
	('7ef0c815-e0c8-4083-834f-9539bddc1ee9', '2024-06-18 08:27:40.827559+00', '2024-06-18 08:27:40.827559+00', '2024-06-01 08:27:19+00', '2024-06-08 08:27:33+00');


--
-- Data for Name: webfolio_experience_description; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."webfolio_experience_description" ("_id", "experience_id", "text_content") VALUES
	('170db49b-eb4a-4926-8f0e-42cde3f4eb95', '7ef0c815-e0c8-4083-834f-9539bddc1ee9', '4615d92e-87b8-4f27-a7b2-57db16b9226b'),
	('fff26771-4945-4c2d-a608-0bf3f545f3cf', '7ef0c815-e0c8-4083-834f-9539bddc1ee9', '9db04994-e686-41ca-b415-d2130ec89c7a');


--
-- Data for Name: webfolio_experience_title; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."webfolio_experience_title" ("_id", "experience_id", "text_content") VALUES
	('e69ba8e5-617f-4978-8a48-f8a2e5a98704', '7ef0c815-e0c8-4083-834f-9539bddc1ee9', 'dc8385f3-e506-4e59-95a1-4cfc7f9d6fd3'),
	('8018e12e-ac67-4519-a3de-fc3399c2a0ac', '7ef0c815-e0c8-4083-834f-9539bddc1ee9', 'bb9b20b4-b966-45f5-8aab-fdddc3f8dca1');




--
-- PostgreSQL database dump complete
--

RESET ALL;

