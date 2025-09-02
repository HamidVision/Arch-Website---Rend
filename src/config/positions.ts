export const boxPositions = {
  // Plan Box (existing, top-right)
  planBox: {
    top: 112,
    left: 980,
    width: 430,
    height: 305,
  },
  
  // Agent Box (to the right of Plan Box title area)
  agentBox: {
    top: 112,
    left: 1420,
    width: 280,
    height: 180,
  },
  
  // Prompt Box (below-left of Agent)
  promptBox: {
    top: 320,
    left: 1420,
    width: 280,
    height: 200,
  },
  
  // Script Box (below Prompt)
  scriptBox: {
    top: 560,
    left: 1420,
    width: 280,
    height: 180,
  },
  
  // Code Box (to the right of Script, dark terminal look)
  codeBox: {
    top: 560,
    left: 1720,
    width: 320,
    height: 280,
  },
  
  // Matrix region (right-side only)
  matrix: {
    top: 112,
    left: 1720,
    width: 320,
    height: 280,
  },
  
  // Video region (full right side)
  video: {
    top: 112,
    left: 1720,
    width: 320,
    height: 400,
  },
} as const;

export type BoxPositions = typeof boxPositions;

// Wire connection points (from center/right to center/left)
export const wireConnections = {
  planToAgent: {
    from: 'planBox',
    to: 'agentBox',
    fromAnchor: 'right', // right edge of plan box
    toAnchor: 'left',    // left edge of agent box
  },
  promptToAgent: {
    from: 'promptBox',
    to: 'agentBox',
    fromAnchor: 'top',
    toAnchor: 'bottom',
  },
  agentToCode: {
    from: 'agentBox',
    to: 'codeBox',
    fromAnchor: 'right',
    toAnchor: 'left',
  },
  scriptToCode: {
    from: 'scriptBox',
    to: 'codeBox',
    fromAnchor: 'right',
    toAnchor: 'left',
  },
} as const;

export type WireConnections = typeof wireConnections;
