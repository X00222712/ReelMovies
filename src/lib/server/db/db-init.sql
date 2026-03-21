
-- DB setup for accounts

-- password : ITSuport
INSERT INTO user
    VALUES (1, 'IT Admin', 'itsuper@reelmovies.ie', 1, 1774013978005, 1774013978005);

INSERT INTO account (id, account_id, provider_id, user_id, password, created_at, updated_at)
    VALUES (1, 1, 'credential', 1, '4fc21a2f5840246c468d4bc03294eca7:c6489ce8b3d5320e648d9205e38f731ffc4cbe6130fcc8cb41ed93dd6ca756627333d1ee5db516012df23ac4586273945f1fc441a40cb474348d7981237b4480', 1774013978005, 1774013978005);

INSERT INTO admins VALUES (1, 1, 1);
INSERT INTO rewardpoints VALUES (1, 100000);

-- password : reelmovies
INSERT INTO user
    VALUES (2, 'Admin', 'admin@reelmovies.ie', 1, 1774013978005, 1774013978005);

INSERT INTO account (id, account_id, provider_id, user_id, password, created_at, updated_at)
    VALUES (2, 2, 'credential', 2, '91e4ec5c444f565c5b6244790e072617:be5568370d352ef92def713845e9d489556faa4dc6d1ef9c18df74222f22f53482e1d73b9e52f7541ff7f756b530bf5ebee2e312ae8f0d939abc56cffd6a7944', 1774013978005, 1774013978005);

INSERT INTO admins VALUES (2, 2, 0);
INSERT INTO rewardpoints VALUES (2, 0);

-- Password : password123
INSERT INTO user
    VALUES (3, 'Glen', 'test@test.ie', 0, 1774013978005, 1774013978005);

INSERT INTO account (id, account_id, provider_id, user_id, password, created_at, updated_at)
    VALUES (3, 3, 'credential', 3, '7c59045f52cff4247210fb1d0417461d:a342781a1eb22a78598c979008cfc8c04d1f6697dcf90ca8dabed3e91f84066189999d33225fd93cc8575370a4bdeeba1623e8cb81db416d24e6cb88b0e05ef8', 1774013978005, 1774013978005);

INSERT INTO rewardpoints VALUES (3, 200);

-- Password : SuperCool
INSERT INTO user
    VALUES (4, 'Alex', 'alex@test.ie', 0, 1774013978005, 1774013978005);

INSERT INTO account (id, account_id, provider_id, user_id, password, created_at, updated_at)
    VALUES (4, 4, 'credential', 4, 'd7d827ae5dd0b41356937e4d40d2c557:14717e34907753a3849cae8a5c5a2b05c689e84e2402159d42943e53e8167385c84a62770a8150c4d0674024e34d5fc0eb81fbd326288bafc9bad841f7c5beb4', 1774013978005, 1774013978005);

INSERT INTO rewardpoints VALUES (4, 400);



-- Testing accounts for signin test
-- Password : password123
INSERT INTO user
    VALUES (5, 'Glen', 'glen@test.ie', 0, 1774013978005, 1774013978005);
INSERT INTO account (id, account_id, provider_id, user_id, password, created_at, updated_at)
    VALUES (5, 5, 'credential', 5, 'de1b06a616a60c21a20fed51812d97f5:709bd40f64fef4426c8d49e0fcb166eba5b810ff6cf921a6e6ee3c39f705145237f7ace0e87f4a35719041ba782cc655ee0a20fc1065b1068aa1c45d8999ece4', 1774013978005, 1774013978005);

INSERT INTO user
    VALUES (6, 'Glen', 'GLEN@test.com', 0, 1774013978005, 1774013978005);
INSERT INTO account (id, account_id, provider_id, user_id, password, created_at, updated_at)
    VALUES (6, 6, 'credential', 6, 'de1b06a616a60c21a20fed51812d97f5:709bd40f64fef4426c8d49e0fcb166eba5b810ff6cf921a6e6ee3c39f705145237f7ace0e87f4a35719041ba782cc655ee0a20fc1065b1068aa1c45d8999ece4', 1774013978005, 1774013978005);
