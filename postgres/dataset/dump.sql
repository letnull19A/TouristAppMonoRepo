--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.2

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: __EFMigrationsHistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL
);


ALTER TABLE public."__EFMigrationsHistory" OWNER TO postgres;

--
-- Name: attractions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.attractions (
    id uuid NOT NULL,
    city_id uuid NOT NULL,
    name character varying(50) NOT NULL,
    description character varying(200),
    image_url character varying(200) NOT NULL
);


ALTER TABLE public.attractions OWNER TO postgres;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id uuid NOT NULL,
    name character varying(50) NOT NULL,
    description character varying(200) NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: cities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cities (
    id uuid NOT NULL,
    country_id uuid NOT NULL,
    name character varying(50) NOT NULL,
    description character varying(200),
    image_url character varying(200) NOT NULL
);


ALTER TABLE public.cities OWNER TO postgres;

--
-- Name: countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.countries (
    id uuid NOT NULL,
    name character varying(50) NOT NULL,
    description character varying(200),
    image_url character varying(200) NOT NULL
);


ALTER TABLE public.countries OWNER TO postgres;

--
-- Name: hotels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hotels (
    id uuid NOT NULL,
    city_id uuid NOT NULL,
    name character varying(50) NOT NULL,
    description character varying(200),
    image_url character varying(200) NOT NULL,
    rating real DEFAULT 0 NOT NULL
);


ALTER TABLE public.hotels OWNER TO postgres;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id uuid NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: tour_hotel; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tour_hotel (
    id uuid NOT NULL,
    tour_id uuid NOT NULL,
    hotel_id uuid NOT NULL
);


ALTER TABLE public.tour_hotel OWNER TO postgres;

--
-- Name: tour_prices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tour_prices (
    id uuid NOT NULL,
    tour_id uuid NOT NULL,
    price numeric NOT NULL,
    days integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.tour_prices OWNER TO postgres;

--
-- Name: tours; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tours (
    id uuid NOT NULL,
    category_id uuid NOT NULL,
    city_id uuid NOT NULL,
    name character varying(50) NOT NULL,
    description character varying(200),
    image_url character varying(200) NOT NULL,
    country_id uuid DEFAULT '00000000-0000-0000-0000-000000000000'::uuid NOT NULL
);


ALTER TABLE public.tours OWNER TO postgres;

--
-- Name: user_tours; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_tours (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    tour_id uuid NOT NULL,
    booking_date date NOT NULL
);


ALTER TABLE public.user_tours OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    first_name character varying(16) NOT NULL,
    last_name character varying(16) NOT NULL,
    patronymic character varying(16),
    email character varying(32) NOT NULL,
    password character varying(64) NOT NULL,
    role_id uuid DEFAULT '00000000-0000-0000-0000-000000000000'::uuid NOT NULL,
    login character varying(32) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: __EFMigrationsHistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."__EFMigrationsHistory" ("MigrationId", "ProductVersion") FROM stdin;
20240316215918_Initial	8.0.3
20240316220034_RmName	8.0.3
20240316222634_RmCategoryImage	8.0.3
20240414195833_AddedReferenceInTour	8.0.3
20240426191350_ChangeDateType	8.0.3
20240426194150_AddedRatingHotel	8.0.3
20240427115446_FatherNameMayIsNullValue	8.0.3
20240427144258_AcceptNullFathername	8.0.3
20240429081814_AddedRoles	8.0.3
20240429082236_AddedReferences	8.0.3
20240429122402_AddedPriceForTours	8.0.3
20240429134124_AddedDaysField	8.0.3
20240429154258_AddedHotelTourTable	8.0.3
20240514214628_AddedLoginField	8.0.3
\.


--
-- Data for Name: attractions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.attractions (id, city_id, name, description, image_url) FROM stdin;
6d92dde3-103b-4ca4-b251-794128d821e1	3400902e-6fea-4534-9a0a-eaad6ea68549	Новая достопримечательность	Описание	
469828ed-0816-4d7c-8994-6e1d153a4963	0b34b936-bb48-4e67-af89-5f82909b61da	Бедный всадник11111	Типо медного всадника1	
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name, description) FROM stdin;
dc5dc8cc-abc6-4f04-9531-84e0512e537e	Wi-Fi	
62d95b79-4faa-4534-8fc7-d785569bd619	test_category	description
9a58b9cf-f662-4c79-a0bd-b3b7dd875826	Категория 1	Описание категории 1
edd33d63-5302-4065-8dac-d4f70c469bf5	Категория 2	Описание категории 2
11953aa5-e0d1-44c6-ac35-08b460711fb9	Категория 3	Описание категории 3
7ba25aba-c5a6-4f7f-b1fc-3e1bad86dab0	Категория 4	Новая категория
66d30d80-aedd-45b6-9e8e-693a74aa6015	Добавлена новая категория	Описание добавленной категории
7479a4aa-0ed1-4dad-97f5-30a23d6b86f9	test	test
\.


--
-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cities (id, country_id, name, description, image_url) FROM stdin;
3400902e-6fea-4534-9a0a-eaad6ea68549	80833fa7-982a-46a2-8d98-2ee9b4dfaee9	Санкт-Петербург		
0b34b936-bb48-4e67-af89-5f82909b61da	80b8f2dd-6003-4d67-bf6f-348f00b95dcf	rgergserggs	fdgsfdgfdgfd	
2f69e5c9-9a73-4acf-99b2-5e137cfc1d10	80833fa7-982a-46a2-8d98-2ee9b4dfaee9	Новый город	Описание нового города	
\.


--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.countries (id, name, description, image_url) FROM stdin;
80833fa7-982a-46a2-8d98-2ee9b4dfaee9	Россия		
80b8f2dd-6003-4d67-bf6f-348f00b95dcf	Турция		
03c70731-ffc6-4e87-ae51-86fbeb4fe66e	Греция		
9c9f55d8-6a50-4dd2-977e-a09a2e901daf	Египет		
fb3ffa2d-a819-4fe9-9489-d639dc6c4b95	Дубай		
47603b94-1e22-4a4c-b230-abbdd482f9c2	ОАЭ		
7679f7d6-d8da-445f-a236-4a0b870cc8fa	Страна чудес	Через горы через лес мы придём в страну чудес	
dbbbf645-d188-4d2e-9b0a-164731c24306	Германия	description	
2cfb8cae-d721-48ea-9359-a1a6f6df81f2	Кипр	test	
95e6a563-5452-4f97-915d-37f7158cc177	Мальта	Описание страны N	
cb50a881-87bf-4a8e-b0af-62645bbbe2ab	Тайланд	string	
\.


--
-- Data for Name: hotels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hotels (id, city_id, name, description, image_url, rating) FROM stdin;
840bec8f-7d97-48c0-ab1c-cdba92d3f6fa	2f69e5c9-9a73-4acf-99b2-5e137cfc1d10	Типо отель111	th trhtr htr hrgt r11		2
8675df09-85cb-4c76-ab5d-402c09364a29	3400902e-6fea-4534-9a0a-eaad6ea68549	Какой-то отель			4
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name) FROM stdin;
a76182e2-7f23-4575-907c-289cbb103ba2	Администратор
0fe41223-993b-4df4-b222-e9aa4b5824b4	Пользователь
\.


--
-- Data for Name: tour_hotel; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tour_hotel (id, tour_id, hotel_id) FROM stdin;
d759ea79-aa72-42e4-bf34-dd3904d0bbc3	5a694132-bd4f-4ecd-a429-025c6926e7bf	8675df09-85cb-4c76-ab5d-402c09364a29
5f99625e-cca0-421b-8312-f8cf75eb34b5	00bcf589-8058-457c-8f21-f75d28f70635	840bec8f-7d97-48c0-ab1c-cdba92d3f6fa
393f89b4-d361-46c1-8fac-514f3f9d9062	566655ca-6edb-4a02-bbcf-8fa455beb5f2	840bec8f-7d97-48c0-ab1c-cdba92d3f6fa
dc382091-5a5c-441e-835c-e57be8bd5207	1ac36e46-33f9-4933-9a4b-84bc4f6d9687	840bec8f-7d97-48c0-ab1c-cdba92d3f6fa
607faf94-bb43-4eda-a4cd-86c99707c18f	e085e35a-fbba-4ccc-bc25-8795dc26f07b	8675df09-85cb-4c76-ab5d-402c09364a29
96434368-11ed-4864-ba63-d710f43d7794	994ba4f3-05ab-4bbb-abe5-2489ffcd3793	840bec8f-7d97-48c0-ab1c-cdba92d3f6fa
39a96631-d475-481a-afcb-171eb3c85409	d3157974-4eed-4663-99e9-589832b71b5c	840bec8f-7d97-48c0-ab1c-cdba92d3f6fa
\.


--
-- Data for Name: tour_prices; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tour_prices (id, tour_id, price, days) FROM stdin;
4af41a17-af26-4029-a51d-b2394d39e8ff	5a694132-bd4f-4ecd-a429-025c6926e7bf	77700	14
64238d8a-1d84-4c76-97e4-29483e0591d8	5a694132-bd4f-4ecd-a429-025c6926e7bf	35350	7
a9c14898-1fe8-40da-b9a7-673b38593567	994ba4f3-05ab-4bbb-abe5-2489ffcd3793	120000	20
672b9b0d-0c5e-41be-9d74-e16e6aa11916	994ba4f3-05ab-4bbb-abe5-2489ffcd3793	77777	777000
c5d0650e-c4ef-4fa2-8386-956fc8d76641	d3157974-4eed-4663-99e9-589832b71b5c	10000	5
9651be79-ae90-43e5-9122-969d8503fb59	d3157974-4eed-4663-99e9-589832b71b5c	17000	14
\.


--
-- Data for Name: tours; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tours (id, category_id, city_id, name, description, image_url, country_id) FROM stdin;
1ac36e46-33f9-4933-9a4b-84bc4f6d9687	7ba25aba-c5a6-4f7f-b1fc-3e1bad86dab0	0b34b936-bb48-4e67-af89-5f82909b61da	тур для удаления12	5 jghghjrhgrlg r r gh flg hg		95e6a563-5452-4f97-915d-37f7158cc177
e085e35a-fbba-4ccc-bc25-8795dc26f07b	9a58b9cf-f662-4c79-a0bd-b3b7dd875826	3400902e-6fea-4534-9a0a-eaad6ea68549	тестовый тур	описание		80833fa7-982a-46a2-8d98-2ee9b4dfaee9
d57dc0e1-c68f-4711-ae27-d0a692a5489f	62d95b79-4faa-4534-8fc7-d785569bd619	0b34b936-bb48-4e67-af89-5f82909b61da	test	test description		80b8f2dd-6003-4d67-bf6f-348f00b95dcf
b53f4f51-bd48-4f16-a005-8d681201d78d	62d95b79-4faa-4534-8fc7-d785569bd619	0b34b936-bb48-4e67-af89-5f82909b61da	test34535345	test description		80b8f2dd-6003-4d67-bf6f-348f00b95dcf
5a694132-bd4f-4ecd-a429-025c6926e7bf	dc5dc8cc-abc6-4f04-9531-84e0512e537e	3400902e-6fea-4534-9a0a-eaad6ea68549	Тур в Турцию обновлён!!	Супер классно и можно отдохнуть ну и не только)))		80833fa7-982a-46a2-8d98-2ee9b4dfaee9
6b34a831-8df4-4990-a752-2989814148b2	62d95b79-4faa-4534-8fc7-d785569bd619	3400902e-6fea-4534-9a0a-eaad6ea68549	test1224	gregreg erg g rgr g		80b8f2dd-6003-4d67-bf6f-348f00b95dcf
86b8f20c-1ca2-4b3c-94de-66a2ef295903	62d95b79-4faa-4534-8fc7-d785569bd619	2f69e5c9-9a73-4acf-99b2-5e137cfc1d10	test	grgr gregerg fg gre		80b8f2dd-6003-4d67-bf6f-348f00b95dcf
994ba4f3-05ab-4bbb-abe5-2489ffcd3793	dc5dc8cc-abc6-4f04-9531-84e0512e537e	2f69e5c9-9a73-4acf-99b2-5e137cfc1d10	j gjklkgjhkg 	bgj erjghjuehgjkr hguefvjufhvjhfjkv hr hv fdhv iehvahe vhldfhvjdfh vhfd jvhdf vhdf vhhv jfdvhjfdhvjkdfhvj fdvhdvd		03c70731-ffc6-4e87-ae51-86fbeb4fe66e
d3157974-4eed-4663-99e9-589832b71b5c	62d95b79-4faa-4534-8fc7-d785569bd619	3400902e-6fea-4534-9a0a-eaad6ea68549	test777	52		80833fa7-982a-46a2-8d98-2ee9b4dfaee9
00bcf589-8058-457c-8f21-f75d28f70635	dc5dc8cc-abc6-4f04-9531-84e0512e537e	3400902e-6fea-4534-9a0a-eaad6ea68549	тур для удаления (должен быть удалён)	11111		80833fa7-982a-46a2-8d98-2ee9b4dfaee9
566655ca-6edb-4a02-bbcf-8fa455beb5f2	9a58b9cf-f662-4c79-a0bd-b3b7dd875826	3400902e-6fea-4534-9a0a-eaad6ea68549	тур для удаления1	543535345324523		9c9f55d8-6a50-4dd2-977e-a09a2e901daf
\.


--
-- Data for Name: user_tours; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_tours (id, user_id, tour_id, booking_date) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, first_name, last_name, patronymic, email, password, role_id, login) FROM stdin;
507e98bf-9a84-4c6d-b96b-3bc496c80700	string	string	string	string	string	0fe41223-993b-4df4-b222-e9aa4b5824b4	
00adf321-0d4a-42db-9e31-622230bde65d	string	string	string	string1	string	0fe41223-993b-4df4-b222-e9aa4b5824b4	string1
\.


--
-- Name: __EFMigrationsHistory PK___EFMigrationsHistory; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."__EFMigrationsHistory"
    ADD CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId");


--
-- Name: attractions PK_attractions; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attractions
    ADD CONSTRAINT "PK_attractions" PRIMARY KEY (id);


--
-- Name: categories PK_categories; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT "PK_categories" PRIMARY KEY (id);


--
-- Name: cities PK_cities; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT "PK_cities" PRIMARY KEY (id);


--
-- Name: countries PK_countries; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT "PK_countries" PRIMARY KEY (id);


--
-- Name: hotels PK_hotels; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotels
    ADD CONSTRAINT "PK_hotels" PRIMARY KEY (id);


--
-- Name: roles PK_roles; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "PK_roles" PRIMARY KEY (id);


--
-- Name: tour_hotel PK_tour_hotel; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_hotel
    ADD CONSTRAINT "PK_tour_hotel" PRIMARY KEY (id);


--
-- Name: tour_prices PK_tour_prices; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_prices
    ADD CONSTRAINT "PK_tour_prices" PRIMARY KEY (id);


--
-- Name: tours PK_tours; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tours
    ADD CONSTRAINT "PK_tours" PRIMARY KEY (id);


--
-- Name: user_tours PK_user_tours; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_tours
    ADD CONSTRAINT "PK_user_tours" PRIMARY KEY (id);


--
-- Name: users PK_users; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_users" PRIMARY KEY (id);


--
-- Name: IX_attractions_city_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_attractions_city_id" ON public.attractions USING btree (city_id);


--
-- Name: IX_cities_country_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_cities_country_id" ON public.cities USING btree (country_id);


--
-- Name: IX_hotels_city_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_hotels_city_id" ON public.hotels USING btree (city_id);


--
-- Name: IX_tour_hotel_hotel_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_tour_hotel_hotel_id" ON public.tour_hotel USING btree (hotel_id);


--
-- Name: IX_tour_hotel_tour_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_tour_hotel_tour_id" ON public.tour_hotel USING btree (tour_id);


--
-- Name: IX_tour_prices_tour_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_tour_prices_tour_id" ON public.tour_prices USING btree (tour_id);


--
-- Name: IX_tours_category_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_tours_category_id" ON public.tours USING btree (category_id);


--
-- Name: IX_tours_city_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_tours_city_id" ON public.tours USING btree (city_id);


--
-- Name: IX_tours_country_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_tours_country_id" ON public.tours USING btree (country_id);


--
-- Name: IX_user_tours_tour_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_user_tours_tour_id" ON public.user_tours USING btree (tour_id);


--
-- Name: IX_user_tours_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_user_tours_user_id" ON public.user_tours USING btree (user_id);


--
-- Name: IX_users_role_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_users_role_id" ON public.users USING btree (role_id);


--
-- Name: attractions FK_attractions_cities_city_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attractions
    ADD CONSTRAINT "FK_attractions_cities_city_id" FOREIGN KEY (city_id) REFERENCES public.cities(id) ON DELETE CASCADE;


--
-- Name: cities FK_cities_countries_country_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT "FK_cities_countries_country_id" FOREIGN KEY (country_id) REFERENCES public.countries(id) ON DELETE CASCADE;


--
-- Name: hotels FK_hotels_cities_city_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotels
    ADD CONSTRAINT "FK_hotels_cities_city_id" FOREIGN KEY (city_id) REFERENCES public.cities(id) ON DELETE CASCADE;


--
-- Name: tour_hotel FK_tour_hotel_hotels_hotel_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_hotel
    ADD CONSTRAINT "FK_tour_hotel_hotels_hotel_id" FOREIGN KEY (hotel_id) REFERENCES public.hotels(id) ON DELETE CASCADE;


--
-- Name: tour_hotel FK_tour_hotel_tours_tour_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_hotel
    ADD CONSTRAINT "FK_tour_hotel_tours_tour_id" FOREIGN KEY (tour_id) REFERENCES public.tours(id) ON DELETE CASCADE;


--
-- Name: tour_prices FK_tour_prices_tours_tour_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_prices
    ADD CONSTRAINT "FK_tour_prices_tours_tour_id" FOREIGN KEY (tour_id) REFERENCES public.tours(id) ON DELETE CASCADE;


--
-- Name: tours FK_tours_categories_category_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tours
    ADD CONSTRAINT "FK_tours_categories_category_id" FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- Name: tours FK_tours_cities_city_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tours
    ADD CONSTRAINT "FK_tours_cities_city_id" FOREIGN KEY (city_id) REFERENCES public.cities(id) ON DELETE CASCADE;


--
-- Name: tours FK_tours_countries_country_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tours
    ADD CONSTRAINT "FK_tours_countries_country_id" FOREIGN KEY (country_id) REFERENCES public.countries(id) ON DELETE CASCADE;


--
-- Name: user_tours FK_user_tours_tours_tour_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_tours
    ADD CONSTRAINT "FK_user_tours_tours_tour_id" FOREIGN KEY (tour_id) REFERENCES public.tours(id) ON DELETE CASCADE;


--
-- Name: user_tours FK_user_tours_users_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_tours
    ADD CONSTRAINT "FK_user_tours_users_user_id" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: users FK_users_roles_role_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_users_roles_role_id" FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

