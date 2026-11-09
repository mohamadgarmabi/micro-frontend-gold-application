import type { MockHttpRoute, MockOptions, MockRoute } from "tanstack-fetch/mock"

type ApiMockMethod = NonNullable<MockHttpRoute["method"]>

type ApiMockHandler = MockHttpRoute["handler"]

type ApiMockRoute = MockRoute

type ApiMockConfig = MockOptions

export type { ApiMockConfig, ApiMockHandler, ApiMockMethod, ApiMockRoute }
