CREATE
OR REPLACE FUNCTION upsert_title (
    query_experience_id UUID,
    language_tag VARCHAR(2),
    new_content TEXT
) RETURNS VOID AS $$
DECLARE
    translation_id UUID;
BEGIN
    -- Vérifie s'il existe une traduction pour cette expérience et cette langue
    SELECT t._id INTO translation_id
    FROM webfolio_text_traduction t
    JOIN webfolio_experience_title et ON t._id = et.text_content
    WHERE et.experience_id = query_experience_id AND t.language_code = language_tag;

    -- Si la traduction existe, on la met à jour
    IF FOUND THEN
        UPDATE webfolio_text_traduction
        SET content = new_content
        WHERE _id = translation_id;
    ELSE
        -- Sinon, on crée une nouvelle traduction
        INSERT INTO webfolio_text_traduction (language_code, content)
        VALUES (language_tag, new_content)
        RETURNING _id INTO translation_id;

        -- On crée la liaison avec l'expérience
        INSERT INTO webfolio_experience_title (experience_id, text_content)
        VALUES (query_experience_id, translation_id);
    END IF;
END;
$$ LANGUAGE plpgsql;

SELECT
    upsert_title (
        '7ef0c815-e0c8-4083-834f-9539bddc1ee9', -- ID de l'expérience
        'en', -- Code de langue
        'Experience title in english' -- Contenu du titre
    );