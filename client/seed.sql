CREATE TABLE IF NOT EXISTS verification_token (
  identifier  TEXT NOT NULL,
  expires     TIMESTAMPTZ NOT NULL,
  token       TEXT NOT NULL,

  PRIMARY KEY (identifier, token)
);

CREATE TABLE IF NOT EXISTS accounts (
  id                    SERIAL,
  "userId"              INTEGER NOT NULL,
  type                  VARCHAR(255) NOT NULL,
  provider              VARCHAR(255) NOT NULL,
  "providerAccountId"   VARCHAR(255) NOT NULL,
  refresh_token         TEXT,
  access_token          TEXT,
  expires_at            BIGINT,
  id_token              TEXT,
  scope                 TEXT,
  session_state         TEXT,
  token_type            TEXT,

  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS sessions (
  id              SERIAL,
  "userId"        INTEGER NOT NULL,
  expires         TIMESTAMPTZ NOT NULL,
  "sessionToken"  VARCHAR(255) NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS users (
  id                SERIAL,
  name              VARCHAR(255),
  email             VARCHAR(255),
  "emailVerified"   TIMESTAMPTZ,
  image             TEXT,

  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS workouts (
  id              SERIAL PRIMARY KEY,
  title           VARCHAR(255) NOT NULL,
  user_id         INT REFERENCES users(id),
  scheduled_for   TIMESTAMP,
  created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS exercise_type (
  id    SERIAL PRIMARY KEY,
  type  VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS exercises (
  id                  SERIAL PRIMARY KEY,
  exercise_type_id    INT REFERENCES exercise_type(id),
  sets                INT NOT NULL,
  reps                INT NOT NULL,
  weights             INT NOT NULL,
  workout_id          INT REFERENCES workouts(id)
);

INSERT INTO exercise_type (type) VALUES
('ABS'),
('ARMS'),
('LEGS'),
('BACK'),
('CHEST'),
('FULL BODY');