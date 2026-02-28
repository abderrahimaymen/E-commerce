const mysql = require('mysql2/promise');

async function fixAuthAll() {
  console.log('🔧 Fixing auth for ALL variants of root...');
  
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'ecommerce_db'
    });

    // Fix specifically for 127.0.0.1 and % just in case
    // The previous one fixed 'localhost'
    
    try {
        await connection.execute("ALTER USER 'root'@'127.0.0.1' IDENTIFIED WITH mysql_native_password BY 'root';");
        console.log('✅ Fixed root@127.0.0.1');
    } catch (e) { console.log('ℹ️  Could not fix root@127.0.0.1 (might not exist)'); }

    try {
        await connection.execute("ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';");
        console.log('✅ Fixed root@%');
    } catch (e) { console.log('ℹ️  Could not fix root@% (might not exist)'); }

    await connection.execute("FLUSH PRIVILEGES;");
    await connection.end();
    console.log('🎉 Done.');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

fixAuthAll();
