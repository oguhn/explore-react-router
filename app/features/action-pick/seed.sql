INSERT INTO action_pick (id, title, image, description, benefits, created_at, updated_at)
VALUES 
  (
    gen_random_uuid(),
    '매일 아침 운동하기',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
    '매일 아침 30분 동안 가벼운 운동을 하며 하루를 시작하세요.',
    ARRAY['체력 향상', '집중력 증가', '스트레스 해소', '건강한 생활습관 형성'],
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    gen_random_uuid(),
    '하루 2리터 물 마시기',
    'https://images.unsplash.com/photo-1523362628745-0c100150b504',
    '하루에 물 2리터를 마시면서 건강한 수분 섭취 습관을 만들어보세요.',
    ARRAY['피부 건강 개선', '신진대사 촉진', '집중력 향상', '체중 관리에 도움'],
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    gen_random_uuid(),
    '독서 습관 만들기',
    'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6',
    '매일 30분씩 책을 읽으며 새로운 지식과 인사이트를 얻어보세요.',
    ARRAY['지식 확장', '스트레스 해소', '창의력 향상', '집중력 개선'],
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    gen_random_uuid(),
    '명상과 마인드풀니스',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
    '하루 10분 명상으로 마음의 평화를 찾고 스트레스를 관리하세요.',
    ARRAY['스트레스 감소', '정서적 안정', '집중력 향상', '수면 질 개선'],
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    gen_random_uuid(),
    '식단 일기 쓰기',
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352',
    '매일 식단을 기록하며 건강한 식습관을 만들어보세요.',
    ARRAY['식습관 개선', '체중 관리', '영양 균형', '건강한 생활습관 형성'],
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  );

INSERT INTO profile (user_id, username, email)
VALUES (
    gen_random_uuid(),
    'testuser',
    'test@example.com'
);

DO $$
DECLARE
    v_profile_id integer;
    v_user_id uuid;
    v_action_id uuid;
BEGIN
    SELECT id, user_id INTO v_profile_id, v_user_id FROM profile ORDER BY created_at DESC LIMIT 1;
    SELECT id INTO v_action_id FROM action_pick ORDER BY created_at ASC LIMIT 1;
    INSERT INTO user_action_pick (
        id,
        user_id,
        profile_id,
        action_pick_id,
        status,
        is_completed,
        started_at,
        created_at,
        updated_at
    )
    VALUES 
        (gen_random_uuid(), v_user_id, v_profile_id, v_action_id, 'in_progress', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (gen_random_uuid(), v_user_id, v_profile_id, v_action_id, 'completed', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (gen_random_uuid(), v_user_id, v_profile_id, v_action_id, 'pending', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
END $$;
