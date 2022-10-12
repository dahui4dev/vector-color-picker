const autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1,
};

const targetOffset = [0, 0];

const placements = {
  topLeft: {
    points: ["bl", "tl"],
    overflow: autoAdjustOverflow,
    offset: [0, -15],
    targetOffset,
  },
  topRight: {
    points: ["br", "tr"],
    overflow: autoAdjustOverflow,
    offset: [0, -15],
    targetOffset,
  },
  bottomLeft: {
    points: ["tl", "bl"],
    overflow: autoAdjustOverflow,
    offset: [0, 15],
    targetOffset,
  },
  bottomRight: {
    points: ["tr", "tl"],
    overflow: autoAdjustOverflow,
    offset: [-20, 0],
    targetOffset,
  },
};

export default placements;
