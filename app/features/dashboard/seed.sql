-- user_ranking에 삽입
INSERT INTO user_ranking (
  user_id,
  username,
  display_name,
  score,
  rank,
  last_action_at,
  created_at,
  updated_at
) VALUES (
  'a95e60e9-8626-4354-b2dd-558548b2bf3d',
  'test_user',
  'Test User',
  100,
  1,
  NOW(),
  NOW(),
  NOW()
);

-- user_action_history에 삽입
INSERT INTO user_action_history (
  user_id,
  action,
  count,
  description,
  created_at,
  updated_at
) VALUES (
  'a95e60e9-8626-4354-b2dd-558548b2bf3d',
  'joined_challenge',
  1,
  'User joined a walking challenge',
  NOW(),
  NOW()
);