module.exports = (sequelize, Sequelize) => {
  const user_detail = sequelize.define(
    "user_detail",
    {
      userId: {
        type: Sequelize.TEXT,
      },

      charges_enable: {
        type: Sequelize.STRING,
        // defaultValue: 0,
      },
      country: {
        type: Sequelize.STRING,
        // defaultValue: "0",
      },
      default_currency: {
        type: Sequelize.STRING,
        // defaultValue: "0",
      },
      payouts_enabled: {
        type: Sequelize.STRING,
      },
      product_description: {
        type: Sequelize.STRING,
      },
      first_name: {
        type: Sequelize.TEXT,
      },
      last_name: {
        type: Sequelize.TEXT,
      },
      company_address: {
        type: Sequelize.TEXT,
      },
      company_postal_code: {
        type: Sequelize.TEXT,
      },
      company_city: {
        type: Sequelize.TEXT,
      },
      company_state: {
        type: Sequelize.TEXT,
      },
      company_country: {
        type: Sequelize.TEXT,
      },
      company_alternatives: {
        type: Sequelize.TEXT,
      },
      company_curent_deadline: {
        type: Sequelize.TEXT,
      },
      company_currently_due: {
        type: Sequelize.TEXT,
      },
      company_disabled_reason: {
        type: Sequelize.TEXT,
      },
      company_error: {
        type: Sequelize.TEXT,
      },
      company_eventually_due: {
        type: Sequelize.TEXT,
      },
      company_last_due: {
        type: Sequelize.TEXT,
      },
      company_pending_varification: {
        type: Sequelize.TEXT,
      },
    },
    { timestamps: false }
  );
  return user_detail;
};
