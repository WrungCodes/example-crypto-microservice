function dbtransaction(database) {
    return {
      transactionBegin: transaction,
      commit: commit,
      rollback: rollback,
    };

    async function transaction()
    {
      return await database.sequelize.transaction();
    }

    async function commit(transaction)
    {
      return await transaction.commit();
    }

    async function rollback(transaction)
    {
      return await transaction.rollback();
    }
  }
  
module.exports = dbtransaction;