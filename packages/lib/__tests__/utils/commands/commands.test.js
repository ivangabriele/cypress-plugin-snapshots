const rewire = require("rewire")

const DEFAULT_CONFIG = rewire("../../../src/config").__get__("DEFAULT_CONFIG")

global.Cypress = {
	env: () => {},
	config: () => {},
	Commands: {
		add: jest.fn(),
	},
}

global.cy = {}

describe("utils/command", () => {
	describe("should retrieve config", () => {
		const config = {
			foo: "bar",
		}

		it("with string config", () => {
			let returnValue = JSON.stringify(DEFAULT_CONFIG)
			global.Cypress.env = (name, value) => {
				if (value) {
					returnValue = value
				}
				return returnValue
			}

			const getConfig = require("../../../src/utils/commands/getConfig")
			expect(getConfig()).toMatchObject(DEFAULT_CONFIG)
		})

		it("with config", () => {
			global.Cypress.env = () => config
			const getConfig = require("../../../src/utils/commands/getConfig")
			expect(getConfig()).toMatchObject(config)
		})
	})
})
