import { testRUT } from './src/assets/TestRUT'

test("Un RUT válido debería dar verdadero", () => {
    expect(testRUT("111111111")).toBe(true);
    expect(testRUT("204899223")).toBe(true);
    expect(testRUT("11111111-1")).toBe(true);
    expect(testRUT("20489922-3")).toBe(true);
    expect(testRUT("11.111.111-1")).toBe(true);
    expect(testRUT("20.489.922-3")).toBe(true);
});

test("Un RUT inválido debería dar falso", () => {
    expect(testRUT("12345678-9")).toBe(false);
    expect(testRUT("12.345.678-9")).toBe(false);
});

test("Un RUT vacío debería dar falso", () => {
    expect(testRUT("")).toBe(false);
});