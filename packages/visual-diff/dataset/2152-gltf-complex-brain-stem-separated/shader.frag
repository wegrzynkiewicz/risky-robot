#version 300 es

in lowp vec3 v_Position;
in lowp vec3 v_Normal;

out lowp vec4 o_Color;

void main(void) {

    lowp vec3 lightPos = vec3(200, 300, 500);
    lowp vec3 lightColor = vec3(1.0, 1.0, 1.0);
    lowp vec3 objectColor = vec3(1.0, 1.0, 1.0);

    // ambient color
    lowp float ambientStrength = 0.4;
    lowp vec3 ambient = ambientStrength * lightColor;

    // diffuse color
    lowp vec3 normal = normalize(v_Normal);
    lowp vec3 lightDirection = normalize(lightPos - v_Position);
    lowp float diff = max(dot(normal, lightDirection), 0.0);
    lowp vec3 diffuse = diff * lightColor;

    lowp vec3 result = (ambient + diffuse) * (v_Normal + 0.5);

    o_Color = vec4(result, 1.0);
}
