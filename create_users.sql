-- /*
--  - Creates user accounts, roles, also maps them together {FOR STAGING PURPOSES ONLY}
--  - {CAUTION: DELETES PREVIOUSLY CREATED RECORDS IF EXISTS USING THE KNOWN IDs}

--  How to run:

-- 1. login to psql prompt:
--   psql -U postgres

-- 2. run
-- \i create_users.sql
-- */

-- -- \connect juidco_masters

-- DO $$

-- create type user as (userName text, email text, roleName text);

-- DECLARE  
--     count integer := 2
--     users user[] := array[('Rahul Gandhi', 'fsdfs@gmail.com', 'EXECUTIVE ENGINEER')];
--    role_id integer := 6000;  
--     user_id integer := 6000;
-- BEGIN  

--      foreach userName, email, roleName in array users loop
--         RAISE NOTICE'CREATING % ROLE WITH ID: %', role, role_id;

--         delete from wf_roles where id=role_id;
--         insert into wf_roles (id, role_name, is_suspended, created_by) values (role_id, role, false, 72);
--         RAISE NOTICE'CREATING ee_stage@gmail.com user with password Admin1#';

--         delete from users where id=user_id;
--         insert into users values(user_id,NULL,'1234567899','stage_ee@gmail.com',NULL,'Employee',2,
--                             '$2a$12$WBxQ70x22EQVpzgJ2i0tnOCx/eE.wFSQSMPZyq3DFvWCrH99Rs1by',
--                             False,NULL,NULL,'17285|6tAYsJZbDiQpQIISVAArHMf5EIuvGBd6p3RPVCwH','2022-12-07 11:20:11',
--                             '2023-06-07 11:36:10',False,NULL,NULL,NULL,NULL,NULL,'JE',NULL,NULL,NULL,NULL);

--         role_id := role_id + 1;
--         user_id := user_id + 1;
--     end loop; 

    



-- END $$;


\c juidco_masters
create type userType as (userName text, email text, roleName text);

do $$
declare 
a userType [];
r record;
ulb_id  integer := 2;
role_id integer := 6000;  
user_id integer := 6000;
role_user_map_id integer :=50000;
roleName text;
begin
  /* composite array initialization */
  a = array[
    ('Stage BO', 'stage.bo@gmail.com', 'BACK OFFICE'),
    ('Stage JE', 'stage.je@gmail.com', 'JUNIOR ENGINEER'),
    ('Stage AE', 'stage.ae@gmail.com', 'ASSISTANT ENGINEER'),
    
    ('Stage EE', 'stage.ee@gmail.com', 'EXECUTIVE ENGINEER'),
    ('Stage SE', 'stage.se@gmail.com', 'SUPERINTENDENT ENGINEER'),
    ('Stage CE', 'stage.ce@gmail.com', 'CHIEF ENGINEER'),

    ('Stage DMC', 'stage.dmc@gmail.com', 'DEPUTY MUNICIPAL COMMISSIONER'),
    ('Stage AMC', 'stage.amc@gmail.com', 'ASSISTANT MUNICIPAL COMMISSIONER'),
    ('Stage EO', 'stage.eo@gmail.com', 'MUNICIPAL COMMISSIONER')
  ];

  foreach r in array a
  loop

    raise notice '% % %', r.userName, r.email, r.roleName;

    delete from wf_roles where id=role_id;
    insert into wf_roles (id, role_name, is_suspended, created_by) values (role_id, r.roleName, false, 72);

    delete from users where id=user_id;
    insert into users values(user_id, r.userName,'1234567899',r.email,NULL,'Employee',ulb_id,
                            '$2a$12$WBxQ70x22EQVpzgJ2i0tnOCx/eE.wFSQSMPZyq3DFvWCrH99Rs1by',
                            False,NULL,NULL,'17285|6tAYsJZbDiQpQIISVAArHMf5EIuvGBd6p3RPVCwH','2022-12-07 11:20:11',
                            '2023-06-07 11:36:10',False,NULL,NULL,NULL,NULL,NULL,r.userName,NULL,NULL,NULL,NULL);


    delete from wf_roleusermaps where id=role_user_map_id;
    insert into wf_roleusermaps (id, wf_role_id, user_id, is_suspended) values(role_user_map_id, role_id, user_id, false);

    role_id := role_id + 1;
    user_id := user_id + 1;
    role_user_map_id := role_user_map_id + 1;
  end loop;
end;
$$;