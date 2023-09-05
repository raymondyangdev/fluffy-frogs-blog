/*
 * Upon submission, this file should contain the SQL script to initialize your database.
 * It should contain all DROP TABLE and CREATE TABLE statments, and any INSERT statements
 * required.
 */

drop table if exists comments;
drop table if exists tags_in_articles;
drop table if exists articles;
drop table if exists tags;
drop table if exists plants;
drop table if exists users;

create table if not exists users (
    id integer not null primary key,
    username varchar(64) unique not null,
	usernameLower varchar(64) not null,
    password varchar(64) not null,
    name varchar(64) not null,
    dob date not null,
    aboutMe varchar(256) not null,
    authToken varchar(128),
    avatarId integer not null
);

create table if not exists plants (
    id integer not null primary key,
    name varchar(64) not null,
    season varchar(6) not null,
    description text not null,
    plantPhoto varchar(64) not null
);

create table if not exists tags (
    id integer not null primary key,
    tag varchar(32) unique not null
);

create table if not exists articles (
    id integer not null primary key,
    title varchar(32) not null,
    timeOfPost datetime not null,
    userId integer not null,
    plantId integer not null,
    content text not null,
    articlePhoto varchar(64) not null,
    FOREIGN KEY (userId) REFERENCES users (id) on delete cascade,
    FOREIGN KEY (plantId) REFERENCES plants (id) on delete cascade
);

create table if not exists tags_in_articles (
    tagId integer not null,
    articleId integer not null,
    PRIMARY KEY (tagId, articleId)
    FOREIGN KEY (tagId) REFERENCES tags (id) on delete cascade,
    FOREIGN KEY (articleId) REFERENCES articles (id) on delete cascade
);

create table if not exists comments (
    id integer not null primary key,
    articleId integer not null,
    author varchar(64) not null,
    timeOfComment datetime not null,
    content varchar(256) not null,
    FOREIGN KEY (author) REFERENCES users (id) on delete cascade,
    FOREIGN KEY (articleId) REFERENCES articles (id) on delete cascade
);

insert into users (id, username, usernameLower, password, name, dob, aboutMe, avatarId) values
	(1, 'User1', 'user1', '$2b$10$Do6WyUiFFkjIXuN20E6cCeRnWu/p7mxgSdJsHuVt8OkzFX9/UiD8q', 'Alice Anderson', date('1993-11-25'), 'I love plants!', 4),
	(2, 'User2', 'user2', '$2b$10$Do6WyUiFFkjIXuN20E6cCeRnWu/p7mxgSdJsHuVt8OkzFX9/UiD8q', 'Bob Butters', date('2000-01-18'), 'Hi I''m Bob Butters and I love butterflies in my garden!!', 1),
	(3, 'UsEr3', 'user3', '$2b$10$Do6WyUiFFkjIXuN20E6cCeRnWu/p7mxgSdJsHuVt8OkzFX9/UiD8q', 'Charlie Chambers', date('1989-05-01'), 'My favourite thing in my garden are my fluffy frogs!', 2),
	(4, 'USER4', 'user4', '$2b$10$Do6WyUiFFkjIXuN20E6cCeRnWu/p7mxgSdJsHuVt8OkzFX9/UiD8q', 'David Dawson', date('1999-07-12'), 'I  like to grow all things green!', 8),
	(5, 'USeR5', 'user5', '$2b$10$Do6WyUiFFkjIXuN20E6cCeRnWu/p7mxgSdJsHuVt8OkzFX9/UiD8q', 'Frank Furters', date('2002-04-09'), 'Gardening is my middle name. No, literally.', 5);

INSERT INTO plants (id, name,  description, season, plantPhoto)
VALUES 
(1,'Tomato','Solanum lycopersicum, is vine plant, typically grown for its tart/umami flavoured red edible berries know as tomatoes. The plant originated in South America and is best grown in temperate environments with hot summers. Vines are typically grown as annual, and most varieties can grow in excess of two meters tall.',  'Summer', 'tomato.png'),
(2,'Sunflower', 'Helianthus annuus, is a large annual plant known for their large flowering heads and crops of edible seeds. They can be grown in excess of 5 meters tall and originate from the Americas.', 'Summer', 'sunflower.png'),
(3, 'Corn', 'Zea mays, also called Indian corn or maize, cereal plant of the grass family (Poaceae) and its edible grain. The domesticated crop originated in the Americas and is one of the most widely distributed of the worlds food crops. Corn is used as livestock feed, as human food, as biofuel, and as raw material in industry.', 'Summer', 'corn.png'),
(4, 'Pepper', 'Capsicum, genus of more than 30 species of flowering plants in the nightshade family (Solanaceae), several of which are extensively cultivated for their edible, often pungent fruits. The genus comprises all the varied forms of fleshy-fruited peppers, including the mild bell peppers that are used as a vegetable and the hot peppers, such as habanero and tabasco, that are used as relishes, pickled, or ground into a fine powder for use as a spice. Some peppers are grown as ornamentals.', 'Summer', 'pepper.png'),
(5, 'Pumpkin', 'Cucurbita pepo, are usually characterized by a hard orange rind with distinctive grooves. Pumpkins are commonly grown for human consumption, for decoration, and also for livestock feed. Pumpkins, which produce very long annual vines, are planted individually or in twos or threes on little hills about 2.5 to 3 metres (8 to 10 feet) apart.', 'Autumn', 'pumpkin.png'), 
(6, 'Radish', 'Raphanus sativus, annual or biennial plant in the mustard family (Brassicaceae), grown for its large succulent taproot. The common radish is likely of Asian or Mediterranean origin and is cultivated worldwide. Radish roots are low in calories and are usually eaten raw; the young leaves can be cooked like spinach.', 'Autumn', 'radish.png'),
(7, 'Broccoli', 'Brassica oleracea, form of cabbage, of the mustard family (Brassicaceae), grown for its edible flower buds and stalk. Native to the eastern Mediterranean and Asia Minor, sprouting broccoli was cultivated in Italy in ancient Roman times.', 'Autumn', 'broccoli.png'),
(8, 'Peas', 'Pisum sativum, also called garden pea, herbaceous annual plant in the family Fabaceae, grown virtually worldwide for its edible seeds. Peas can be bought fresh, canned, or frozen, and dried peas are commonly used in soups.', 'Autumn', 'peas.png'), 
(9, 'Broad-beans', 'Vicia faba, also called fava bean or faba bean, species of legume (family Fabaceae) widely cultivated for its edible seeds. The broad bean is the principal bean of Europe, though it is generally less well known in the United States. As with other vetches, broad beans are frequently planted as cover crops and green manures, as they add nitrogen to the soil by means of nitrogen-fixing bacteria.', 'Winter', 'broad-beans.png'),
(10, 'Taro', 'Colocasia esculenta, also called eddo or dasheen, herbaceous plant of the arum family (Araceae) and its edible rootlike corm. Taro is probably native to southeastern Asia, whence it spread to Pacific islands and became a staple crop. It is cultivated for its large, starchy, spherical corms (underground stems), commonly known as “taro root,” which are consumed as a cooked vegetable, made into puddings and breads, and also made into the Polynesian poi, a thin, pasty, highly digestible mass of fresh or fermented taro starch. The large leaves of the taro are commonly stewed.', 'Winter', 'taro.png'), 
(11, 'Kale', 'Brassica oleracea, loose-leafed edible plant derived from the cabbage of the mustard family (Brassicaceae). Kale is grown mainly for autumn and winter harvest, as cold improves its eating quality and flavour; its hardiness permits harvest of fresh greens after most fresh vegetables have become unavailable.', 'Winter', 'kale.png'),
(12, 'Carrot', 'Daucus carota, herbaceous, generally biennial plant of the Apiaceae family that produces an edible taproot. Among common varieties root shapes range from globular to long, with lower ends blunt to pointed. Besides the orange-coloured roots, white-, yellow-, and purple-fleshed varieties are known.', 'Winter', 'carrot.png'), 
(13, 'Asparagus', 'Asparagus, Garden asparagus, the most economically important species of the genus, is cultivated in most temperate and subtropical parts of the world. As a vegetable, it has been prized by epicures since Roman times. It is most commonly served cooked, either hot or in salad; the classic accompaniment is hollandaise sauce.', 'Spring', 'asparagus.png'), 
(14, 'Spring-Onion',  'Amaryllidaceae also called scallion, young onions (family ) harvested when their tops are green and the underdeveloped bulbs are 13 mm (0.5 inch) or less in diameter.', 'Spring', 'spring-onion.png'),
(15, 'Kumara',  'Ipomoea batatas grows on a creeping vine and evolved from a larger American variety with bigger tubers and better taste which was imported in the early 1850s. The majority of Kumara is grown in Northland in the Northern Wairoa region where soil type and climatic conditions suit it perfectly.', 'Spring', 'kumara.png'),
(16, 'Bush-beans', 'Phaseolus vulgaris, traditionally sown in rows, dwarf beans also grow well broadcast or scattered over an area. Just scatter the seed (dont worry about the odd ones which are close up). Cover with soil, potting mix, or compost and firm down with the back of a spade or rake. Grown this way the beans will mostly shade out competing weeds and self-mulch.', 'Spring', 'bush-beans.png');

	
-- TODO: tags dummy data 
insert into tags (id, tag) values
	(1, 'fruit');

-- TODO: articles dummy data 
insert into articles (id, title, timeOfPost, userId, plantId, content,articlePhoto) values
(1, 'First time tomato grower', datetime('2022-11-04 20:46:19'), 1, 1, 'The first experience I had of growing tomatoes was back in the year 2000.
I bought six young tomato plants and two grow bags from a local garden centre and planted three of the plants in each.  One of the growbags was placed on the patio area against the house and the other was placed in full sun on the patio.
A bamboo cane was put behind each plant and as the plants grew, I used pieces of string to tie the plants to the canes for support. The plants were watered frequently and once the first fruits had set, they were also given a weekly feed with tomato food. Very soon we had some lovely tomatoes and as there were far too many for us, we gave them away to family and friends.
I wasnt the only one to water the plants though - we had a male dog at the time and he watered the plants that were in full sun - and he watered them several times a day. It was these tomatoes that performed better than the others and needless to say, it was those ones which we gave away, but we didnt tell the grateful recipients what they had been watered with and we were thanked very much for the tasty tomatoes. It was only in recent years that I found out that urine is high in nitrogen and the plants were benefiting from it.
After finding how easy it was to grow tomatoes, I was so happy with my first attempt at growing something to eat that has not traveled hundreds or thousands of miles to get here that the following year I started growing them from seed myself. I find it so much more rewarding growing from seed rather than buying plants that have already been started.  I now save my own seed using the same method as a friend recommended to me (Saving Tomato Seeds)', '1.png'),
(2, 'Peas please',datetime('2013-12-04 20:46:19'), 3,8, 'Introduction
Peas (Pisum sativum) are a cool season crop. If you ask a gardener if she or he grows peas, the answer is generally, "yes." Because peas can germinate in cool soil, many gardeners are happy to grow peas because they can resume their gardening earlier in the spring. A more pointed question to a gardener may be the types of peas they grow. The response to this question may lead to a discussion about the somewhat confusing naming of peas.
Within Pisum sativum, there are three types of peas: English peas, snow peas and sugar snap peas. Each of these types of peas may be known by multiple names. While a rose may still be a rose, a pea is not always a pea.
In addition to interchangeable names of Pisum sativum, some plants called peas, are, from a botanical perspective, not peas. Black-eyed peas are an excellent example. Black-eyed peas (Vigna unguiculata) are a variety of the cowpea and part of the Legume family. Although called a pea, it is actually a bean and a good example of confusing vegetable names. Both peas and beans are legumes and both have edible seeds and pods.
According to the Penguin Companion to Food, bean is a "term loosely applied to any legume whose seeds or pods are eaten, not classed separately as a pea or lentil." Beans traditionally were in the genus Phaseolus, but now some of the species, including the black-eyed pea, are in the genus Vigna. Peas are in the genus Pisum.', '4.png'),
(3, 'Why plant sunflowers?', datetime('2016-12-06 21:46:19'), 3, 2, 'Who doesnt love the bright, cheerful sight of a sunflower in full bloom? These beauties come in a variety of colors and types to keep your garden vibrant, while their familiar yellow profile isnt hard to find when seed shopping in the spring or fall. Apart from their popularity in floral arrangements, garden beds, and even pumpkin patches, why are sunflowers grown?
Agriculturally speaking, sunflowers are grown for a variety of purposes, from the production of food items to the enrichment of the soil they grow in. For the sisters at Lee Farms, sunflowers are the star of “agritainment” (or “agriculture entertainment”) on the Oregon property. They are, in the words of Lee Milera, “for visitor experience and enjoyment.”
“We dedicate approximately five acres to growing sunflowers for the pure purpose of entertaining visitors,” she says. “Once our festival wraps up, we mow down the sunflower stems and leftover flower heads and seeds and feed them to our cattle. Sunflowers are an excellent source of fat and protein.”
Sunflower seeds are certainly a popular snack—and a great addition to any salad—while the oil they produce serves as a trendy alternative to vegetable or olive oil. Sunflower oil can be used as an ingredient in dressings or as nut butter substitutes. It can also be used on its own for frying, sautéing, or searing a number of delicious foods. Cattle arent the only ones who enjoy a good sunflower snack.', '5.png'); 


-- TODO: tags_in_articles dummy data
insert into tags_in_articles (tagId, articleId) values
	(1, 1);

-- TODO: comments dummy data
insert into comments (content, timeofComment, author, articleId) values ('Amazing blog!', datetime('2022-11-04 20:46:19'), 1, 1);