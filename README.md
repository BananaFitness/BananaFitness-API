# API Server
- The API server is deployed on Heroku at <https://covalent-fitness-api.herokuapp.com>

## API Routes

### Workout
- GET /api/workout/:workout\_id (Get a workout by workout\_id)
- POST /api/workout (Create/Update a workout)
- DELETE /api/workout/:workout\_id (Delete a workout by workout\_id)

### Workouts
- GET /api/workouts (Get all the workouts)
- GET /api/workouts/:user\_id (Get all the workouts by user\_id)

### Move
- GET /api/move/:move\_id (Get a move by move\_id)
- POST /api/move (Create/Update a workout)
- DELETE /api/move/:move\_id (Delete a move by move\_id)

### Moves
- GET /api/moves (Get all moves)
- GET /api/moves/:workout\_id (Get all moves by workout\_id)

### User
- GET /api/user/:user\_id (Get a user by user\_id)
- GET /api/user//username/:username (Get a user by username)

### Users
- GET /api/users/ (Get all users)

### Follow
- POST /api/follow (Create a follow)
- DELETE /api/follow/:user\_id/:followee\_id (Delete a follow where user\_id is currently following followee\_id)

### Follows
- GET /api/follows/:user\_id (Get all followed users of the passed in user\_id)

### Authentication
- GET /auth/signout (Log out and kill session)
- POST /auth/signin (Sign in)
- POST /auth/signup (Create a new user)