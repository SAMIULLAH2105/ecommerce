const Feature = require("../../models/Feature");

const removeFeatureImage = async (req, res) => {
  try {
    const { id } = req.params;

    const feature = await Feature.findByIdAndDelete(id);

    if (!feature) {
      return res.status(404).json({
        success: false,
        message: "Feature not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Sucessfully deleted!",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = { removeFeatureImage };
