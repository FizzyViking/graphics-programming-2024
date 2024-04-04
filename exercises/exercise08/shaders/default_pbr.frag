//Inputs
in vec3 WorldPosition;
in vec3 WorldNormal;
in vec3 WorldTangent;
in vec3 WorldBitangent;
in vec2 TexCoord;

//Outputs
out vec4 FragColor;

//Uniforms
uniform vec3 Color;
uniform sampler2D ColorTexture;
uniform sampler2D NormalTexture;
uniform sampler2D SpecularTexture;

uniform vec3 CameraPosition;

void main()
{
	SurfaceData data;
	data.normal = SampleNormalMap(NormalTexture, TexCoord, normalize(WorldNormal), normalize(WorldTangent), normalize(WorldBitangent));
	data.albedo = Color * texture(ColorTexture, TexCoord).rgb; // 0.1
	vec3 arm = texture(SpecularTexture, TexCoord).rgb;
	data.ambientOcclusion = arm.x; // 0.1
	data.roughness = arm.y; // 0.1
	data.metallic = arm.z; // 0.1

	vec3 position = WorldPosition;
	vec3 viewDir = GetDirection(position, CameraPosition);
	vec3 color = ComputeLighting(position, data, viewDir, true);
	FragColor = vec4(color.rgb, 1);
}
