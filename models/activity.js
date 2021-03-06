var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Activity = new Schema({
  metaActivity: { type: String, default: '' },
  activityVerb: { type: String, required: true },
  activity: { type: String, required: true },
  specificLocation: { type: String, default: '' },
  needPass: { type: Boolean, default: false },
  city: { type: String, trim: true },
  region: { type: String, trim: true },
  country: { type: String, trim: true },
  description: { type: String, default: '' },
  link: { type: String },
  img: { type: String, default: '/img/activity-group.gif' },
  targetIntensity: { type: Number, default: 5 },
  targetFeelings: { type: String, default: '' },
  restrictions: { type: String, default: '' },
  expires: { type: Boolean, default: false },
  expirationDatetime: { type: Date },
  activated: { type: Boolean, default: false },
  addedBy: { type: String, default: '' },
  numVotes: { type: Number, default: 0 },
  ageu18Votes: { type: Number, default: 50 },
  age1824Votes: { type: Number, default: 50 },
  age2534Votes: { type: Number, default: 50 },
  age3544Votes: { type: Number, default: 50 },
  age4554Votes: { type: Number, default: 50 },
  age5564Votes: { type: Number, default: 50 },
  ageo65Votes: { type: Number, default: 50 },
  feelingWorriedVotes: { type: Number, default: 50 },
  feelingEmotionalVotes: { type: Number, default: 50 },
  feelingUnfocusedVotes: { type: Number, default: 50 },
  feelingBoredVotes: { type: Number, default: 50 },
  feelingStressedVotes: { type: Number, default: 50 },
  feelingLethargicVotes: { type: Number, default: 50 },
  feelingAngryVotes: { type: Number, default: 50 },
  feelingIsolatedVotes: { type: Number, default: 50 },
  feelingFineVotes: { type: Number, default: 50 },
  lowSeverityVotes: { type: Number, default: 50 },
  medSeverityVotes: { type: Number, default: 50 },
  highSeverityVotes: { type: Number, default: 50 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Activity', Activity);
