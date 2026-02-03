const bcrypt = require('bcrypt');
const { prisma } = require('../config/database');

async function initializeAdmin() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    
    if (!adminEmail) {
      console.log('⚠️  ADMIN_EMAIL not set in environment variables');
      return;
    }

    const existingAdmin = await prisma.admin.findUnique({
      where: { email: adminEmail }
    });

    if (existingAdmin) {
      console.log('✅ Admin user already exists');
      return;
    }

    // Create default admin with temporary password
    const defaultPassword = 'Admin@123';
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    await prisma.admin.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Admin',
        isVerified: true,
        isActive: true
      }
    });

    console.log('✅ Default admin created');
    console.log(`📧 Email: ${adminEmail}`);
    console.log(`🔑 Password: ${defaultPassword}`);
    console.log('⚠️  Please change the password after first login!');
  } catch (error) {
    console.error('❌ Failed to initialize admin:', error);
  }
}

module.exports = { initializeAdmin };
