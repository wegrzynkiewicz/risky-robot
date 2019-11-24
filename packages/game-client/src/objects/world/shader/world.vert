#version 300 es

// layout(location=0) in vec3 a_VertexPosition;
layout(location=1) in vec3 a_VertexColor;
layout(location=2) in int a_VertexOrientation;
layout(location=3) in int a_VertexPositionIndex;

uniform highp mat4 u_modelMatrix;
uniform highp mat4 u_viewMatrix;
uniform highp mat4 u_projectionMatrix;

out vec3 v_fragmentPosition;
out vec3 v_fragmentNormal;
out vec3 v_fragmentColor;
out vec3 v_fragmentColor1;

const int[6] vertexIdToPlaneOrder = int[6] (
/*  0 = bottom-left          */ 0,
/*  1 = bottom-right         */ 1,
/*  2 = top-right            */ 2,
/*  3 = bottom-left          */ 0,
/*  4 = top-right            */ 2,
/*  5 = top-left             */ 3
);

const int[24] planeOrderWithOrientationToBoxOrder = int[24] (
/*  0 = top; bottom-left     */ 4,
/*  1 = top; bottom-right    */ 5,
/*  2 = top; top-right       */ 6,
/*  3 = top; top-left        */ 7,

/*  4 = bottom; bottom-left  */ 3,
/*  5 = bottom; bottom-right */ 2,
/*  6 = bottom; top-right    */ 1,
/*  7 = bottom; top-left     */ 0,

/*  8 = front; bottom-left   */ 0,
/*  9 = front; bottom-right  */ 1,
/* 10 = front; top-right     */ 5,
/* 11 = front; top-left      */ 4,

/* 12 = back; bottom-left    */ 7,
/* 13 = back; bottom-right   */ 6,
/* 14 = back; top-right      */ 2,
/* 15 = back; top-left       */ 3,

/* 16 = left; bottom-left    */ 3,
/* 17 = left; bottom-right   */ 0,
/* 18 = left; top-right      */ 4,
/* 19 = left; top-left       */ 7,

/* 20 = right; bottom-left   */ 1,
/* 21 = right; bottom-right  */ 2,
/* 22 = right; top-right     */ 6,
/* 23 = right; top-left      */ 5
);

const vec3[8] boxOrderToPosition = vec3[8](
/*  0 = bottom; front; left  */ vec3(-0.5, -0.5, 0.5),
/*  1 = bottom; front; right */ vec3(0.5, -0.5, 0.5),
/*  2 = bottom; back; right  */ vec3(0.5, -0.5, -0.5),
/*  3 = bottom; back; left   */ vec3(-0.5, -0.5, -0.5),
/*  4 = top; front; left     */ vec3(-0.5, 0.5, 0.5),
/*  5 = top; front; right    */ vec3(0.5, 0.5, 0.5),
/*  6 = top; back; right     */ vec3(0.5, 0.5, -0.5),
/*  7 = top; back; left      */ vec3(-0.5, 0.5, -0.5)
);

const float step = 1.02;

vec3 calculatePosition(int cubeIndex, int a_VertexOrientation) {

    int rotation = ((gl_VertexID / 3 % 2)) > 0 ? 3 : 0;
    int planeOrder = vertexIdToPlaneOrder[(gl_VertexID % 3) + rotation];
    int boxOrder = planeOrderWithOrientationToBoxOrder[planeOrder + (4 * a_VertexOrientation)];
    vec3 boxPosition = boxOrderToPosition[boxOrder];

    float y = float(cubeIndex / 256);
    float z = float(cubeIndex % 256 / 16);
    float x = float(cubeIndex % 16);

    vec3 positionOffset = vec3(x, y, z) * step - 8.0;

    return positionOffset + boxPosition;
}

void main(void) {
    vec3 vertexPosition = calculatePosition(a_VertexPositionIndex, a_VertexOrientation);
    v_fragmentColor = a_VertexColor;
    v_fragmentPosition = vec3(u_modelMatrix * vec4(vertexPosition, 1.0));
    gl_Position = u_projectionMatrix * u_viewMatrix * vec4(v_fragmentPosition, 1.0);
}
