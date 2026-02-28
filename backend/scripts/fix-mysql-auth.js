const mysql = require('mysql2/promise');

async function fixAuth() {
  console.log('🔧 Attempting to update MySQL user authentication method...');
  
  try {
    // Connect using the root user (or whatever is in env/config)
    // Assuming default credentials from app.module.ts if not provided
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root', // Adjust if needed
      database: 'ecommerce_db'
    });

    console.log('✅ Connected to MySQL!');

    // Check current user
    const [rows] = await connection.execute('SELECT CURRENT_USER() as user');
    console.log('Current user:', rows[0].user);

    // ALTER USER to use mysql_native_password
    // This makes it compatible with older drivers and some node libraries
    await connection.execute("ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';");
    console.log('✅ Updated authentication plugin for root@localhost to mysql_native_password');
    
    await connection.execute("FLUSH PRIVILEGES;");
    console.log('✅ Flushed privileges');

    await connection.end();
    console.log('🎉 Fix complete! You can now run the seed script.');

  } catch (error) {
    console.error('❌ Failed to fix auth:', error.message);
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
        console.log('💡 Tip: Check your database password in backend/.env or app.module.ts');
    }
  }
}

fixAuth();
