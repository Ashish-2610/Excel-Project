const csv = require('csvtojson');
const Agent = require('../models/agent');
const User = require('../models/user');
const Account = require('../models/account');
const Carrier = require('../models/carrier');
const LOB = require('../models/category');
const Policy = require('../models/policy');
const user = require('../models/user');

exports.uploadCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'CSV file is required' });
    }
    const csvBuffer = req.file.buffer;
    const csvString = csvBuffer.toString();
    const jsonArray = await csv().fromString(csvString);
    for (const row of jsonArray) {
      await Agent.findOneAndUpdate(
        { agentName: row.agent },
        { agentName: row.agent },
        { upsert: true, new: true }
      );
      const user = await User.findOneAndUpdate(
        { email: row.email },
        {
          firstName: row.firstname,
          dob: row.dob,
          address: row.address,
          phoneNumber: row.phone,
          state: row.state,
          zipCode: row.zip,
          email: row.email,
          gender: row.gender,
          userType: row.userType,
        },
        { upsert: true, new: true }
      );
      await Account.findOneAndUpdate(
        { accountName: row.account_name },
        { accountName: row.account_name, userId: user._id },
        { upsert: true, new: true }
      );
      const lob = await LOB.findOneAndUpdate(
        { categoryName: row.category_name },
        { categoryName: row.category_name },
        { upsert: true, new: true }
      );
      const carrier = await Carrier.findOneAndUpdate(
        { companyName: row.company_name },
        { companyName: row.company_name },
        { upsert: true, new: true }
      );
      await Policy.create({
        policyNumber: row.policy_number,
        policyStartDate: row.policy_start_date,
        policyEndDate: row.policy_end_date,
        userId: user._id,
        categoryId: lob._id,
        companyId: carrier._id,
      });
    }
    res.status(200).json({ message: `Successfully Inserted ${jsonArray.length} records.` });
  } catch (err) {
    res.status(400).json({ message: 'Upload Failed', error: err.message });
  }
};
exports.searchPoliciesByUserName = async (req, res) => {
  try {
    const {firstName}  = req.query;
    if (!firstName) {
      return res.status(400).json({ message: 'First name is required' });
    }
    const policies = await Policy.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $match: {
          'user.firstName': { $regex: firstName, $options: 'i' }
        }
      },
      {
        $project: {
          _id: 0,
          policyNumber: 1,
          policyStartDate: 1,
          policyEndDate: 1,
          user: {
            firstName: 1,
            email: 1,
            phone: 1,
            gender: 1
          }
        }
      }
    ]);

    res.status(200).json({ count: policies.length, policies });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching policies', error: error.message });
  }
};
exports.getAggregatedPoliciesByUser = async (req, res) => {
  try {
    const result = await user.aggregate([
      {
        $lookup: {
          from: 'policies',           
          localField: '_id',          
          foreignField: 'userId',     
          as: 'policies'              
        }
      },
      {
        $project: {
          _id: 0,
          firstName: 1,
          email: 1,
          policyCount: { $size: '$policies' } 
        }
      }
    ]);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: 'Fetch Failed', error: error.message });
  }
};
