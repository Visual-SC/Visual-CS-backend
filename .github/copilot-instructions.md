# AI Agent Instructions - Visual SC Backend

## Project Overview
Express + MongoDB backend for an accessible cafe menu application. Uses MVC architecture with 8 menu item categories (adiciones, alicorados, baseDeEspresso, etc.), each with parallel Model-Controller-Route structure.

## Key Architecture Patterns

### Schema Inheritance Pattern
All menu models inherit from `MenuItemSchema` (base fields: `nombre`, `descripcion`, `precio`):
```javascript
// MVC/models - spread operator for inheritance
const adicionesSchema = Schema({ ...MenuItemSchema })
```
New categories must follow this pattern.

### Route Registration (Auto-Wiring)
Routes registered dynamically in `index.js`:
```javascript
const routes = { addtions: require('./MVC/routes/adiciones'), ... };
Object.values(routes).forEach(route => { app.use("/api/menu:itemId", route); });
```
New categories require: model, controller, route files + entry in routes object.

### Controller Pattern
Controllers use Mongoose `.find()` with promise chains (then/catch):
```javascript
const getAdditions = async (req,res) => {
    await Model.find({}).then(list => res.status(200).send({status:"success",...}))
}
```

## Development Setup
- **Runtime**: Node.js with nodemon (`npm start`)
- **Database**: MongoDB local (mongodb://localhost:27017/rodson-coffee)
- **Dependencies**: express, mongoose, cors, multer, validator
- **Note**: Connection string hardcoded - use environment variables for production

## Conventions
- Spanish naming for business logic/routes
- Error responses use `{status:"failed", messages:"..."}` (note: typo in "messages" is maintained across codebase)
- All endpoints return JSON with status field for client handling
- File naming matches category names across MVC folders

## Common Tasks
- **Add menu category**: Replicate structure from `MVC/models/adiciones.js`, `controllers/adiciones.js`, `routes/adiciones.js`
- **Fix queries**: Controllers in `/MVC/controllers/` - migrate from .then() to async/await for consistency
- **Database issues**: Verify MongoDB running on port 27017 and connection string in `database/connection.js`
