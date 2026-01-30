const mongoose = require('mongoose');
const { connection } = require('./database/connection');
const PasteleriaDulce = require('./MVC/models/pasteleriaDulce');
const fs = require('fs');
const path = require('path');

// Conectar a la base de datos
connection();

// Función para insertar datos
const insertPasteleriaDulce = async () => {
    try {
        // Leer el archivo JSON
        const dataPath = path.join(__dirname, 'data', 'pasteleriaDulce.json');
        const jsonData = fs.readFileSync(dataPath, 'utf8');
        const items = JSON.parse(jsonData);

        // Limpiar la colección (opcional)
        await PasteleriaDulce.deleteMany({});
        console.log('Colección limpiada ✅');

        // Insertar los datos
        const result = await PasteleriaDulce.insertMany(items);
        console.log(`✅ ${result.length} items insertados en pasteleriaDulce`);
        
        // Mostrar los items insertados
        console.log('\nItems insertados:');
        result.forEach((item, index) => {
            console.log(`${index + 1}. ${item.nombre} - $${item.precio}`);
        });

        // Cerrar la conexión
        mongoose.connection.close();
        console.log('\n🎉 Proceso completado exitosamente');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error al insertar datos:', error);
        mongoose.connection.close();
        process.exit(1);
    }
};

// Ejecutar la función
insertPasteleriaDulce();
