const { prisma } = require('../config/database');

class SessionManager {
  async addSession(userId, token) {
    try {
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
      
      await prisma.session.create({
        data: {
          userId,
          token,
          expiresAt
        }
      });
      
      console.log(`✅ Session created for user: ${userId}`);
    } catch (error) {
      console.error('Failed to add session:', error);
    }
  }

  async removeSession(userId, token) {
    try {
      await prisma.session.deleteMany({
        where: {
          userId,
          token
        }
      });
      
      console.log(`✅ Session removed for user: ${userId}`);
    } catch (error) {
      console.error('Failed to remove session:', error);
    }
  }

  async isSessionValid(userId, token) {
    try {
      const session = await prisma.session.findFirst({
        where: {
          userId,
          token,
          expiresAt: {
            gt: new Date()
          }
        }
      });
      
      return !!session;
    } catch (error) {
      console.error('Failed to check session:', error);
      return false;
    }
  }

  async cleanExpiredSessions() {
    try {
      const result = await prisma.session.deleteMany({
        where: {
          expiresAt: {
            lt: new Date()
          }
        }
      });
      
      console.log(`✅ Cleaned ${result.count} expired sessions`);
    } catch (error) {
      console.error('Failed to clean expired sessions:', error);
    }
  }
}

module.exports = new SessionManager();
