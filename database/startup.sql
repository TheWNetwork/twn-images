create table command_provider
(
    id_command_provider bigint auto_increment
        primary key,
    id_provider         bigint                   null,
    command             varchar(20) charset utf8 null,
    endpoint            varchar(200)             null,
    deleted             int default 0            null
);

create table provider
(
    id_provider bigint auto_increment
        primary key,
    description varchar(200)              null,
    code        varchar(20) charset utf8  null,
    destination varchar(100) charset utf8 null,
    api_user    varchar(100) charset utf8 null,
    api_key     varchar(255) charset utf8 null,
    disabled    int default 0             null
);

INSERT INTO twnimages.provider (description, code, destination, api_user, api_key, disabled) VALUES
    ('Nekos.life', 'NekosLife', 'https://nekos.life/api/v2/img/', null, null, 0),
    ('Danbooru.donmai.us', 'Danbooru', 'https://danbooru.donmai.us/posts.json', '', '', 0);