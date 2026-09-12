-- LifeQuest Seed Data
-- Run after applying migrations to populate sample achievements

insert into public.achievements (name, description, requirement, reward_xp, reward_gold, icon) values
  ('First Quest',        'Complete your very first quest.',         '{"quests_completed": 1}',   50,  25,  'military_tech'),
  ('Quest Novice',       'Complete 10 quests.',                     '{"quests_completed": 10}',  100, 50,  'military_tech'),
  ('Quest Adept',        'Complete 50 quests.',                     '{"quests_completed": 50}',  250, 125, 'military_tech'),
  ('Quest Master',       'Complete 100 quests.',                    '{"quests_completed": 100}', 500, 250, 'military_tech'),
  ('Level 5 Hero',       'Reach level 5.',                          '{"level": 5}',              100, 50,  'person'),
  ('Level 10 Champion',  'Reach level 10.',                         '{"level": 10}',             250, 125, 'person'),
  ('Level 25 Legend',    'Reach level 25.',                         '{"level": 25}',             500, 250, 'emoji_events'),
  ('Streak Starter',     'Maintain a 3-day battle streak.',         '{"streak": 3}',             75,  35,  'local_fire_department'),
  ('Week Warrior',       'Maintain a 7-day battle streak.',         '{"streak": 7}',             150, 75,  'local_fire_department'),
  ('Month Champion',     'Maintain a 30-day battle streak.',        '{"streak": 30}',            500, 250, 'local_fire_department'),
  ('Gold Seeker',        'Accumulate 500 gold.',                    '{"gold": 500}',             100, 0,   'paid'),
  ('Gold Hoarder',       'Accumulate 5000 gold.',                   '{"gold": 5000}',            250, 0,   'paid');
